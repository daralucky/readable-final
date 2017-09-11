import { schema, normalize } from 'normalizr';

const category  = new schema.Entity('categories', {}, { idAttribute: 'path' })

const categorySchema = { categories: [ category ] }

export { categorySchema};