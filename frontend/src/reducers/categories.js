import {
    RECEIVE_CATEGORIES
} from '../actions'


function categories(state = {}, action) {
    switch (action.type) {
        case RECEIVE_CATEGORIES:
        const {categories} = action
        return { ...state, ...categories}

        default:
            return state
    }
}

export default categories