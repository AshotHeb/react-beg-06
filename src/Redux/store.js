import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import types from './actionTypes';

const initialState = {
    counter: 0,
    todoState: {
        tasks: [],
        deleteTaskId: null,
        isOpenAddTaskModal: false,
        isOpenConfirm: false,
        checkedTasks: new Set(),
        oneCheckedTask: null
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
        case types.SET_TASKS: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    tasks: action.data
                }
            }
        }
        case types.DELETE_ONE_TASK: {
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
        case types.SET_OR_REMOVE_LOADING: {
            return {
                ...state,
                loading: action.isLoading
            }
        }
        case types.SET_DELETE_TASK_ID: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    deleteTaskId: action._id
                }
            }
        }
        case types.TOGGLE_OPEN_ADD_TASK_MODAL: {
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    isOpenAddTaskModal: !state.todoState.isOpenAddTaskModal
                }
            }
        }
        case types.ADD_TASK: {
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
        case types.TOGGLE_CONFIRM_MODAL: {
            const { checkedTasks, tasks } = state.todoState;
            let oneCheckedTask = null;
            if (checkedTasks.size === 1) {
                oneCheckedTask = tasks.find(task => task._id === Array.from(checkedTasks)[0]);
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    oneCheckedTask,
                    isOpenConfirm: !state.todoState.isOpenConfirm
                }
            }

        }
        case types.TOGGLE_CHECK_TASK: {
            //check
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
        case types.DELETE_CHECKED_TASKS: {
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
        case types.TOGGLE_CHECK_ALL: {
            const { tasks } = state.todoState;
            let checkedTasks = new Set(state.todoState.checkedTasks);
            if (tasks.length === checkedTasks.size) {
                checkedTasks.clear();
            } else {
                tasks.forEach(task => {
                    checkedTasks.add(task._id);
                });
            }
            return {
                ...state,
                todoState: {
                    ...state.todoState,
                    checkedTasks
                }
            }
        }

        default: return state;
    }
}

const store = createStore(reducer, applyMiddleware(thunk));
window.store = store;
export default store;

