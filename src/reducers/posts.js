import {
    RECEIVE_POSTS,
    POST_UPDATE_VOTE
} from '../actions'

function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts
            }

        case POST_UPDATE_VOTE:
            const { id, newVoteScore } = action.payload

            /*
            // spread syntax version
            return {
                ...state,
                [id]: {
                    ...state[id],
                    voteScore: newVoteScore,
                },
            }
            */

            const updatedPost = state[id]
            updatedPost.voteScore = newVoteScore

            return {
                ...state,
                [id]: updatedPost
            }

        default:
            return state
    }
}

export default posts