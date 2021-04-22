import types from '../actionTypes';

const initialState = {
    title: "",
    description: "",
    date: new Date()
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_MODAL_INPUT: {
            const { name, value } = action.target;
            return {
                ...state,
                [name]: value
            }
        }
        case types.CHANGE_MODAL_DATE: {

            return {
                ...state,
                date: action.date
            }
        }
        case types.SET_EDITABLE_TASK_TO_MODAL_STATE: {
            const { editableTask } = action;
            return {
                ...state,
                ...editableTask,
                date: new Date(editableTask.date)
            }
        }
        case types.RESET_TASK_MODAL: {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}

export default reducer;