import * as ReadableAPI from '../utils/ReadableAPI'

export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES"
export const RECEIVE_POSTS = "RECEIVE_POSTS"
export const RECEIVE_COMMENTS = "RECEIVE_COMMENTS"


export const receiveComments= comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments= (postId) => dispatch => (
  ReadableAPI
      .getCommentByPostId(postId)
      .then(comments => dispatch(receiveComments(comments)))
)


export const receivePosts= posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch => (
  ReadableAPI
      .getAllPosts()
      .then( (posts) => {
        //console.log('fetchPosts' + JSON.stringify(posts))

        posts.map( post =>
          dispatch(fetchComments(post.id))
        )

        dispatch(receivePosts(posts))

      })
)


export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => (
  ReadableAPI
      .getAllCategories()
      .then(categories => dispatch(receiveCategories(categories)))
)