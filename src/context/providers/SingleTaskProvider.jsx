import { singleTaskContext } from '../context';
import { useState, useCallback } from 'react';
const API_HOST = "http://localhost:3001";


const SingleTaskProvider = (props) => {
    const [singleTask, setSingleTask] = useState(null);
    const [isEditModal, toggleEditModal] = useState(false);
    const [loading, setLoading] = useState(false);



    //functions
    const handleEditTask = useCallback((editTask) => {
        setLoading(true) //Loading Started
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                toggleEditModal(false);
                setSingleTask(data);
            })
            .catch(error => {
                console.log("SingleTask ,Edit Task Request Error", error);
            })
            .finally(() => {
                setLoading(false);  //Loading Ended
            });
    },[]);

    const handleDeleteTask = useCallback(() => {
        setLoading(true); //Loading Started
        const { _id } = singleTask;
        fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                props.history.push("/");
            })
            .catch(error => {
                setLoading(false); //Loading Ended
                console.log("SingleTask ,Delete Task Request Error", error);
            });

    }, [singleTask, props.history]);
    
    const getTask = useCallback(() => {
        const { id } = props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                setSingleTask(data);
            })
            .catch(error => {
                console.log("Single Task Get Request ", error);
                props.history.push(`/error/${error.status}`, error.message);
            });


    }, [props.match.params, props.history]);

    return (
        <singleTaskContext.Provider
            value={{
                //state
                singleTask,
                isEditModal,
                loading,
                //actions
                handleEditTask,
                toggleEditModal,
                handleDeleteTask,
                getTask
            }}
        >
            {props.children}
        </singleTaskContext.Provider>
    )
}

export default SingleTaskProvider;