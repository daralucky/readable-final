
const api = "http://localhost:5001"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

//Categories
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    //.then(data => data.categories)


//Posts
export const getPostsByCategory = (catName) =>
  fetch(`${api}/${catName}/posts`, { headers })
    .then(res => res.json())

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())

export const getPostsById = (Id) =>
  fetch(`${api}/posts/${Id}`, { headers })
    .then(res => res.json())


//Comments

//Get all the comments for a single post
export const getCommentByPostId = (Id) =>
  fetch(`${api}/posts/${Id}/comments`, { headers })
    .then(res => res.json())
