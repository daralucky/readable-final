import {
    RECEIVE_COMMENTS,
    COMMENT_UPDATE_VOTE
} from '../actions'
import * as CONSTANTS from '../constants'


function comments(state = {}, action) {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return { ...state, ...action.comments }

        case COMMENT_UPDATE_VOTE:
            const { id, mechanism } = action.payload
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

        default:
            return state
    }
}

export default comments