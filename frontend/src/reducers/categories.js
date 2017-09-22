import {
    RECEIVE_CATEGORIES
} from '../actions/types'


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