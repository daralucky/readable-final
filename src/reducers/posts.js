import {
    RECEIVE_POSTS,
    POST_VOTE_UP
} from '../actions'

function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.posts }


        case POST_VOTE_UP:
            const { id, newVoteScore } = action.payload

            return {
                ...state,
                    ...state.posts,
                    [id]: {
                        ...state.posts,
                        voteScore: newVoteScore
                    }


            }


        default:
            return state
    }
}

export default posts