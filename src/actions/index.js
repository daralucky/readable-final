import * as ReadableAPI from '../utils/ReadableAPI'
import { normalize } from 'normalizr';
import * as UUID from 'uuid'
import { categorySchema, postSchema, commentSchema } from '../schemas';
import { getEpoch } from '../utils/helpers'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"

export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const POST_UPDATE_VOTE = "POST_UPDATE_VOTE"
export const POST_DELETE = "POST_DELETE"
export const POST_ADD_NEW = "POST_ADD_NEW"
export const POST_EDIT = "POST_EDIT"


export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"
export const COMMENT_UPDATE_VOTE = "COMMENT_UPDATE_VOTE"
export const COMMENT_DELETE = "COMMENT_DELETE"
export const COMMENT_PARENT_DELETED = "COMMENT_PARENT_DELETED"

export const UPDATE_SETTINGS = "UPDATE_SETTINGS"


export const updateSettings = (key, value) => ({
  type: UPDATE_SETTINGS,
  key,
  value
})



export const commentParentDeleted = (id) => {

  return {
    type: COMMENT_PARENT_DELETED,
    payload: {
      id
    }
  }
}

export const commentDelete = (id) => {
  //delete comment from API
  ReadableAPI.commentDelete(id)

  return {
    type: COMMENT_DELETE,
    payload: {
      id
    }
  }
}

export const commentUpdateVote = (id, mechanism) => {
  //update comment API
  ReadableAPI.commentVote(id, mechanism)

  return {
    type: COMMENT_UPDATE_VOTE,
    payload: {
      id,
      mechanism
    }
  }
}

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
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

  //add new post to API
  ReadableAPI.addNewPost(editedPost.id, editedPost.timestamp, editedPost.title, editedPost.body, editedPost.author, editedPost.category)

  return {
    type: POST_EDIT,
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
    type: POST_ADD_NEW,
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
    type: POST_DELETE,
    payload: {
      id
    }
  }
}

export const postUpdateVote = (id, mechanism) => {

  //update post API
  ReadableAPI.postVote(id, mechanism)

  return {
    type: POST_UPDATE_VOTE,
    payload: {
      id,
      mechanism
    }
  }
}

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
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
  type: RECEIVE_CATEGORIES,
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