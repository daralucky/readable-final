import {
    UPDATE_SETTINGS
} from '../actions'

function settings(state = {}, action) {
    const {key, value} = action
    switch (action.type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                [key]: value
            }

        default:
            return state
    }
}

export default settings