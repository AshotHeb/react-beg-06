import types from '../actionTypes';

const initialState = {
    loading: false
}

const globalReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_OR_REMOVE_LOADING:
            return {
                ...state,
                loading: action.isLoading
            }
        default: return state;
    }
}

export default globalReducer;