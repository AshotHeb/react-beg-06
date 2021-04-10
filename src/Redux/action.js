import types from './actionTypes';
const API_HOST = "http://localhost:3001";
export const SetTasksThunk = (dispatch) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });
    fetch(`${API_HOST}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;

            dispatch({ type: types.SET_TASKS, data });
        })
        .catch(error => {
            console.log("Get All Tasks ", error);
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });
        })

}

export const addTaskThunk = (dispatch, formData) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });
    fetch(`${API_HOST}/task`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            //data.error
            if (data.error)
                throw data.error;
            dispatch({ type: types.ADD_TASK, data });
        })
        .catch(error => {
            console.log("Add Task Error", error);
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });
        });
}

export const deletOneTaskThunk = async (dispatch, _id) => {
    try {
        dispatch({ type: types.SET_DELETE_TASK_ID, _id })  //loading Started
        const response = await fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        });
        const data = await response.json();

        if (data.error) throw data.error;
        dispatch({ type: types.DELETE_ONE_TASK, _id })
    } catch (error) {
        console.log("Delete One Task Request Error", error);
    }
    finally {
        dispatch({ type: types.SET_DELETE_TASK_ID, _id: null }) //Loading Ended
    }

}

export const removeCheckedTasks = (dispatch, checkedTasks) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });   //Loading Started
    fetch(`${API_HOST}/task`, {
        method: "PATCH",
        body: JSON.stringify({ tasks: Array.from(checkedTasks) }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({ type: types.DELETE_CHECKED_TASKS });
        })
        .catch(error => {
            console.log("Delete Batch of Tasks Error", error);
        })
        .finally(() => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false }); //Loading Ended
        })
}