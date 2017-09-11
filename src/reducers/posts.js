import {
    RECEIVE_POSTS,
    POST_VOTE_UP
} from '../actions'

function posts(state = {}, action) {
    switch (action.type) {
        case RECEIVE_POSTS:
            return { ...state, ...action.posts }

        /*
        case POST_VOTE_UP:
            const { id } = action
            if (state.posts) {
                return [
                    ...state,
                    {
                        posts: state.posts.map(
                            (post) => post.id === id ? { ...post, voteScore: post.voteScore + 1 }
                                : post
                        )
                    }
                ]
            } else {
                return state
            }
        */

        default:
            return state
    }
}

export default posts