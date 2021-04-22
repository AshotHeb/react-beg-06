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
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });

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
            dispatch({
                type: types.SET_SUCCESS_MESSAGE,
                successMessage: "Task was added successfully !"
            });
        })
        .catch(error => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
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
            dispatch({
                type: types.SET_SUCCESS_MESSAGE,
                successMessage: "Task was deleted !"
            })
        }

    } catch (error) {
        dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
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
            dispatch({
                type: types.SET_SUCCESS_MESSAGE,
                successMessage: "Checked tasks were deleted !"
            })
        })
        .catch(error => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
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
                dispatch({
                    type: types.SET_SUCCESS_MESSAGE,
                    successMessage: "Task Edited successfully !"
                })
            } else if (page === "singleTask") {
                dispatch({ type: types.SET_SINGLE_TASK, data });
                dispatch({
                    type: types.SET_SUCCESS_MESSAGE,
                    successMessage: "Task Edited successfully !"
                })
            } else {
                throw new Error("The Page is not Found!");
            }

        } catch (error) {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        }
        finally {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });   //Loading Started
        }

    })()



}

export const setSingleTaskThunk = (id, history) => (dispatch) => {

    fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({ type: types.SET_SINGLE_TASK, data });
        })
        .catch(error => {
            history.push(`/error/${error.status}`, error.message);
        });

}
export const sendContactFromThunk = (formData, history) => (dispatch) => {
    const formDataCopy = { ...formData };
    for (let key in formDataCopy) {
        if (typeof formDataCopy[key] === "object" && formDataCopy[key].hasOwnProperty("value")) {
            formDataCopy[key] = formDataCopy[key].value;
        } else {
            delete formDataCopy[key];
        }
    }

    dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });   //Loading Started
    fetch(`${API_HOST}/form`, {
        method: "POST",
        body: JSON.stringify(formDataCopy),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({
                type: types.SET_SUCCESS_MESSAGE,
                successMessage: "Form Sended successfully  !"
            })
            history.push("/");
        })
        .catch(error => {
            dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });   //Loading Started
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        });
}
export const toggleStatusThunk = (task) => (dispatch) => {
    const status = task.status === "done" ? "active" : "done";
    fetch(`${API_HOST}/task/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error;
            dispatch({ type: types.EDIT_TASK, data });

        })
        .catch(error => {
            dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
        });

}
export const sortOrFilterThunk = (formData) => (dispatch) => {
    let formDataFilter = { ...formData };
    window.formDataFilter = formDataFilter;
    let query = "?";
    for (let key in formDataFilter) {
        if (!formDataFilter[key]) delete formDataFilter[key]
        else {
            query += key + "=" + formDataFilter[key] + "&";
        }
    }
    if (Object.keys(formDataFilter).length) {
        dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: true });   //Loading Started
        fetch(`${API_HOST}/task${query.slice(0, query.length - 1)}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                dispatch({ type: types.SET_TASKS, data });
                dispatch({ type: types.RESET_SEARCH_STATE });
                

            })
            .catch(error => {
                dispatch({ type: types.SET_ERROR_MESSAGE, error: error.message });
            })
            .finally(() => {
                dispatch({ type: types.SET_OR_REMOVE_LOADING, isLoading: false });   //Loading Ended
            })
    }

}


export const toggleSingleTaskModal = () => (dispatch) => {
    dispatch({ type: types.TOGGLE_SINGLETASK_EDIT_MODAL });
}

export const resetSingleTaskState = () => (dispatch) => {
    dispatch({ type: types.RESET_SINGLE_TASK_STATE });


}


export const changeContactForm = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_CONTACT_FORM, target });
}
export const setDropDownValueForSearch = (dropDown, value) => (dispatch) => {
    dispatch({ type: types.SET_DROPDOWN_VARIANT, dropDown, value });
}
export const changeSearchValue = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_SEARCH_VALUE, target });
}

export const setDate = (name, date) => (dispatch) => {
    dispatch({ type: types.SET_DATE, name, date });
}

export const changeModalInput = (target) => (dispatch) => {
    dispatch({ type: types.CHANGE_MODAL_INPUT, target });
}

export const changeModalDate = (date) => (dispatch) => {
    dispatch({ type: types.CHANGE_MODAL_DATE, date });
}
export const setEditableTaskToModalState = (editableTask) => (dispatch) => {
    dispatch({ type: types.SET_EDITABLE_TASK_TO_MODAL_STATE, editableTask });
}
export const resetTaskModalState = () => (dispatch) => {
    dispatch({ type: types.RESET_TASK_MODAL });
}



