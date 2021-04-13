import types from '../actionTypes';

const initialState = {
    tasks: [],
    deleteTaskId: null,
    isOpenAddTaskModal: false,
    isOpenConfirm: false,
    checkedTasks: new Set(),
    oneCheckedTask: null,
    editableTask: null
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_TASKS: {
            return {
                ...state,
                tasks: action.data
            }
        }
        case types.DELETE_ONE_TASK: {
            let tasks = [...state.tasks];
            tasks = tasks.filter(task => task._id !== action._id);
            return {
                ...state,
                tasks

            }
        }
        case types.SET_DELETE_TASK_ID: {
            return {
                ...state,
                deleteTaskId: action._id

            }
        }
        case types.TOGGLE_OPEN_ADD_TASK_MODAL: {
            return {
                ...state,
                isOpenAddTaskModal: !state.isOpenAddTaskModal

            }
        }
        case types.ADD_TASK: {
            let tasks = [...state.tasks];
            tasks.push(action.data);
            return {
                ...state,
                tasks,
                isOpenAddTaskModal: false

            }
        }
        case types.TOGGLE_CONFIRM_MODAL: {
            const { checkedTasks, tasks } = state;
            let oneCheckedTask = null;
            if (checkedTasks.size === 1) {
                oneCheckedTask = tasks.find(task => task._id === Array.from(checkedTasks)[0]);
            }
            return {
                ...state,
                oneCheckedTask,
                isOpenConfirm: !state.isOpenConfirm

            }

        }
        case types.TOGGLE_CHECK_TASK: {
            //check
            const { _id } = action;
            let checkedTasks = new Set(state.checkedTasks);
            if (!checkedTasks.has(_id)) {
                checkedTasks.add(_id);
            } else {
                checkedTasks.delete(_id);
            }

            return {
                ...state,
                checkedTasks

            }
        }
        case types.DELETE_CHECKED_TASKS: {
            let tasks = [...state.tasks];
            tasks = tasks.filter(task => !state.checkedTasks.has(task._id));
            return {
                ...state,
                checkedTasks: new Set(),
                tasks

            }

        }
        case types.TOGGLE_CHECK_ALL: {
            const { tasks } = state;
            let checkedTasks = new Set(state.checkedTasks);
            if (tasks.length === checkedTasks.size) {
                checkedTasks.clear();
            } else {
                tasks.forEach(task => {
                    checkedTasks.add(task._id);
                });
            }
            return {
                ...state,
                checkedTasks

            }
        }
        case types.SET_EDIT_TASK: {
            return {
                ...state,
                editableTask: action.editTask ?? null
            }

        }
        case types.EDIT_TASK: {

            const { data } = action;
            const tasks = [...state.tasks];
            const idx = tasks.findIndex(task => task._id === data._id);
            tasks[idx] = data;
            return {
                ...state,
                tasks,
                editableTask: null
            }
        }
        case types.RESET_DATA: {
            return {
                ...initialState
            }
        }
        default: return state;
    }
}

export default todoReducer