import { createStore } from 'redux';
const initialState = {
    counter: 0,
    todoState: {
        tasks: [],
        deleteTaskId: null,
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        checkedTasks: new Set()
    },
    loading: false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "plus": {
            return {
                ...state,
                counter: state.counter + 1
            }
        }
        case "minus": {
            return {
                ...state,
                counter: state.counter - 1
            }
        }
        case "SET_TASKS": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data
                }
            }
        }
        case "DELETE_ONE_TASK": {
            let tasks = [...state.todoState.tasks];
            tasks = tasks.filter(task => task._id !== action._id);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks
                }
            }
        }
        case "SET_OR_REMOVE_LOADING": {
            return {
                ...state,
                loading: action.isLoading
            }
        }
        case "SET_DELETE_TASK_ID": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    deleteTaskId: action._id
                }
            }
        }
        case "TOGGLE_OPEN_ADD_TASK_MODAL": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal
                }
            }
        }
        case "ADD_TASK": {
            let tasks = [...state.todoState.tasks];
            tasks.push(action.data);
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks,
                    isOpenAddTaskModal: false
                }
            }
        }
        case "TOGGLE_CONFIRM_MODAL": {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenConfirm: !state.todoState.isOpenConfirm
                }
            }

        }
        case "TOGGLE_CHECK_TASK": {
            const { _id } = action;
            let checkedTasks = new Set(state.todoState.checkedTasks);
            if (!checkedTasks.has(_id)) {
                checkedTasks.add(_id);
            } else {
                checkedTasks.delete(_id);
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks
                }
            }
        }
        case "DELETE_CHECKED_TASKS": {
            let tasks = [...state.todoState.tasks];
            tasks = tasks.filter(task => !state.todoState.checkedTasks.has(task._id));
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks: new Set(),
                    tasks
                }
            }

        }
        default: return state;
    }
}

const store = createStore(reducer);
window.store = store;
export default store;

