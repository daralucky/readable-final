import {
    RECEIVE_COMMENTS,
    COMMENT_UPDATE_VOTE,
    COMMENT_DELETE,
    COMMENT_PARENT_DELETED
} from '../actions'
import * as CONSTANTS from '../constants'


function comments(state = {}, action) {

    switch (action.type) {
        case RECEIVE_COMMENTS:
            return { ...state, ...action.comments }

        case COMMENT_UPDATE_VOTE:
            let { id, mechanism } = action.payload
            const updatedComment = state[id]

            switch (mechanism) {
                case CONSTANTS.UP_VOTE:
                    updatedComment.voteScore = updatedComment.voteScore + 1
                    break

                case CONSTANTS.DOWN_VOTE:
                    updatedComment.voteScore = updatedComment.voteScore - 1
                    break

                default:
                    updatedComment.voteScore = updatedComment.voteScore + 1
            }

            return {
                ...state,
                [id]: updatedComment
            }

        case COMMENT_DELETE:
            //console.log('COMMENT_DELETE: ' + JSON.stringify(state))
            const deletedComment = state[action.payload.id]
            deletedComment.deleted = true
            return {
                ...state,
                [action.payload.id]: deletedComment
            }

        case COMMENT_PARENT_DELETED:
            const parentDeletedComment = state[action.payload.id]
            parentDeletedComment.parentDeleted = true
            return {
                ...state,
                [action.payload.id]: parentDeletedComment
            }

        default:
            return state
    }
}

export default comments