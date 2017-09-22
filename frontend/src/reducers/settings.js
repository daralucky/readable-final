import {
    UPDATE_SETTINGS
} from '../actions/types'

const initialState = {
    orderPost: '-voteScore',
    redirectFromDeletePost: false,
    redirectFromAddNewPost: false,
    redirectFromEditPost: false,
    redirectFromAddComment: false,
    redirectFromEditComment: false,

}

function settings(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SETTINGS:
            const { key, value } = action
            return {
                ...state,
                [key]: value
            }

        default:
            return state
    }
}

export default settings