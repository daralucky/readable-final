import { schema } from 'normalizr';

const category  = new schema.Entity('categories', {}, { idAttribute: 'path' })
const post  = new schema.Entity('posts')
const comment = new schema.Entity('comments')


const categorySchema = { categories: [ category ] }
const postSchema = { posts: [ post ] }
const commentSchema = { comments: [ comment ] }

export { categorySchema, postSchema, commentSchema};