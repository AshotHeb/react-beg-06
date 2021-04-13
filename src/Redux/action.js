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

export const deletOneTaskThunk = (_id, history = null) => async (dispatch) => {
    try {
        dispatch({ type: types.SET_DELETE_TASK_ID, _id })  //loading Started
        const response = await fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        });
        const data = await response.json();

        if (data.error) throw data.error;
        if (history) {
            history.push("/");
        } else {
            dispatch({ type: types.DELETE_ONE_TASK, _id });
        }

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

export const handleEditTaskThunk = (editableTask, page = "todo") => (dispatch) => {
    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });   //Loading Started
    (async () => {
        try {
            const { _id } = editableTask;
            const response = await fetch(`${API_HOST}/task/${_id}`, {
                method: "PUT",
                body: JSON.stringify(editableTask),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.error) throw data.error;
            if (page === "todo") {
                dispatch({ type: types.EDIT_TASK, data });
            } else if (page === "singleTask") {
                dispatch({ type: types.SET_SINGLE_TASK, data });
            } else {
                throw new Error("The Page is not Found!");
            }

        } catch (error) {
            console.log("Edit Task Request Error", error);
        }
        finally {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });   //Loading Started
        }

    })()



}

export const setSingleTaskThunk = (id, history) => (dispatch) => {
    // const { id } = props.match.params;
    fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({ type: types.SET_SINGLE_TASK, data });
        })
        .catch(error => {
            console.log("Single Task Get Request ", error);
            history.push(`/error/${error.status}`, error.message);
        });

}

export const toggleSingleTaskModal = () => (dispatch) => {
    dispatch({ type: types.TOGGLE_SINGLETASK_EDIT_MODAL });
}

export const resetSingleTaskState = () => (dispatch) => {
    dispatch({ type: types.RESET_SINGLE_TASK_STATE });


}

