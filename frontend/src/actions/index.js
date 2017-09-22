import * as ReadableAPI from '../utils/ReadableAPI'
import { normalize } from 'normalizr';
import * as UUID from 'uuid'
import { categorySchema, postSchema, commentSchema } from '../schemas';
import { getEpoch } from '../utils/helpers'
import * as types from './types'



export const updateSettings = (key, value) => ({
  type: types.UPDATE_SETTINGS,
  key,
  value
})


export const commentAddNew = (values) => {

  const newComment = {
    'id': UUID.v4(),
    'timestamp': getEpoch(),
    ...values,
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  }

  //add new post to API
  ReadableAPI.addNewComment(newComment.id, newComment.timestamp, newComment.body, newComment.author, newComment.parentId)

  return {
    type: types.COMMENT_ADD_NEW,
    payload: {
      newComment
    }
  }
}

export const commentEdit = (editedComment) => {

  //update comment to API
  ReadableAPI.editComment(editedComment.id, editedComment.timestamp, editedComment.body, editedComment.author)

  return {
    type: types.COMMENT_EDIT,
    payload: {
      editedComment
    }
  }

}

export const commentParentDeleted = (id) => {

  return {
    type: types.COMMENT_PARENT_DELETED,
    payload: {
      id
    }
  }
}

export const commentDelete = (id) => {
  //delete comment from API
  ReadableAPI.commentDelete(id)

  return {
    type: types.COMMENT_DELETE,
    payload: {
      id
    }
  }
}

export const commentUpdateVote = (id, mechanism) => {
  //update comment API
  ReadableAPI.commentVote(id, mechanism)

  return {
    type: types.COMMENT_UPDATE_VOTE,
    payload: {
      id,
      mechanism
    }
  }
}

export const receiveComments = comments => ({
  type: types.RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (postId) => dispatch => (
  ReadableAPI
    .getCommentByPostId(postId)
    .then((comments) => {
      //console.log('fetchComments: ' + JSON.stringify(comments))

      //make up results to correct format for normalizr
      let cleanComments = { comments: comments }
      //console.log('cleanComments: ' + JSON.stringify(cleanComments))

      let normalizedComments = normalize(cleanComments, commentSchema)
      //console.log('normalizedComments: ' + JSON.stringify(normalizedComments))

      let usableComments = normalizedComments.entities.comments

      dispatch(receiveComments(usableComments))
    })
)

export const postEdit = (editedPost) => {

  //update post to API
  ReadableAPI.editPost(editedPost.id, editedPost.timestamp, editedPost.title, editedPost.body, editedPost.author, editedPost.category)

  return {
    type: types.POST_EDIT,
    payload: {
      editedPost
    }
  }

}

export const postAddNew = (values) => {
  //console.log('UUID v4: ' + JSON.stringify(UUID.v4(), null, 2))
  //console.log('getEpoch: ' + JSON.stringify(getEpoch(), null, 2))
  const newPost = {
    'id': UUID.v4(),
    'timestamp': getEpoch(),
    ...values,
    voteScore: 1,
    deleted: false
  }

  //add new post to API
  ReadableAPI.addNewPost(newPost.id, newPost.timestamp, newPost.title, newPost.body, newPost.author, newPost.category)

  return {
    type: types.POST_ADD_NEW,
    payload: {
      newPost
    }
  }
}

export const postUpdateChildrenComment = (children) => dispatch => (
  children.map(child => dispatch(commentParentDeleted(child)))
)

export const postDelete = (id) => {
  //delete post from API
  ReadableAPI.postDelete(id)

  return {
    type: types.POST_DELETE,
    payload: {
      id
    }
  }
}

export const postUpdateVote = (id, mechanism) => {

  //update post API
  ReadableAPI.postVote(id, mechanism)

  return {
    type: types.POST_UPDATE_VOTE,
    payload: {
      id,
      mechanism
    }
  }
}

export const receivePosts = posts => ({
  type: types.RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  ReadableAPI
    .getAllPosts()
    .then((posts) => {
      //console.log('fetchPosts: ' + JSON.stringify(posts))

      //make up results to correct format for normalizr
      let cleanPosts = { posts: posts }
      //console.log('newPosts: ' + JSON.stringify(cleanPosts))

      posts.map(post =>
        dispatch(fetchComments(post.id))
      )

      let normalizedPosts = normalize(cleanPosts, postSchema)
      //console.log('normalizedPosts: ' + JSON.stringify(normalizedPosts))

      let usablePosts = normalizedPosts.entities.posts

      dispatch(receivePosts(usablePosts))

    })
)


export const receiveCategories = categories => ({
  type: types.RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI
    .getAllCategories()
    .then(categories => {
      //console.log('fetchCategories: ' + JSON.stringify(categories))

      let normalizedCategories = normalize(categories, categorySchema)
      //console.log('normalizedCategories: ' + JSON.stringify(normalizedCategories))

      let myCategories = normalizedCategories.entities.categories

      dispatch(receiveCategories(myCategories))
    })
)