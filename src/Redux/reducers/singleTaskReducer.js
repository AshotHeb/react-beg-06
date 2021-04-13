import types from '../actionTypes';

const initialState = {
    singleTask: null,
    isEditModal: false
}

const singleTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_SINGLE_TASK: {
            return {
                ...state,
                singleTask: action.data,
                isEditModal: false
            }
        }
        case types.TOGGLE_SINGLETASK_EDIT_MODAL: {
            return {
                ...state,
                isEditModal: !state.isEditModal
            }
        }
        case types.RESET_SINGLE_TASK_STATE: {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}

export default singleTaskReducer;