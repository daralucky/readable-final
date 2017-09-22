import {
    RECEIVE_POSTS,
    POST_UPDATE_VOTE,
    POST_DELETE,
    POST_ADD_NEW,
    POST_EDIT
} from '../actions/types'
import * as CONSTANTS from '../constants'


function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts
            }

        case POST_UPDATE_VOTE:
            const { id, mechanism } = action.payload

            const updatedPost = state[id]

            switch (mechanism) {
                case CONSTANTS.UP_VOTE:
                    updatedPost.voteScore = updatedPost.voteScore + 1
                    break

                case CONSTANTS.DOWN_VOTE:
                    updatedPost.voteScore = updatedPost.voteScore - 1
                    break

                default:
                    updatedPost.voteScore = updatedPost.voteScore + 1
            }

            return {
                ...state,
                [id]: updatedPost
            }

        case POST_DELETE:
            const deletedPost = state[action.payload.id]
            deletedPost.deleted = true
            return {
                ...state,
                [action.payload.id]: deletedPost
            }

        case POST_ADD_NEW:
            const { newPost } = action.payload
            // console.log('POST_ADD_NEW: ' + JSON.stringify(action.payload, null, 2))
            return {
                ...state,
                [newPost.id]: newPost
            }

        case POST_EDIT:
            const { editedPost } = action.payload
            //console.log('POST_EDIT: ' + JSON.stringify(action.payload, null, 2))
            return {
                ...state,
                [editedPost.id]: editedPost
            }


        default:
            return state
    }
}

export default posts