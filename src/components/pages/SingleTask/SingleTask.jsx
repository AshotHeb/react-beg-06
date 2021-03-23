import React from 'react';
import styles from './singleTask.module.css'
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import TaskModal from '../../TaskModal/TaskModal';

const API_HOST = "http://localhost:3001";

class SingleTask extends React.Component {
    state = {
        singleTask: null,
        isEditModal: false
    }
    toggleEditModal = () => {
        this.setState({
            isEditModal: !this.state.isEditModal
        });
    }
    handleEditTask = (editTask) => {
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
                this.setState({
                    singleTask: data,
                    isEditModal:false
                });
            })
            .catch(error => {
                console.log("SingleTask ,Edit Task Request Error", error);
            })
    }
    handleDeleteTask = () => {
        const { _id } = this.state.singleTask;
        fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) throw data.error;
                console.log("this.props", this.props);
                this.props.history.push("/");
            })
            .catch(error => {
                console.log("SingleTask ,Delete Task Request Error", error);
            });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`${API_HOST}/task/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.setState({
                    singleTask: data
                });
            })
            .catch(error => {
                this.props.history.push("/404");
                console.log("Single Task Get Request ", error);
            });
    }
    render() {

        const { singleTask, isEditModal } = this.state;
        if (!singleTask) return <p>Loading...</p>
        return (
            <>
                <div>
                    <h1>SingleTask</h1>
                    <div className={styles.singleTaskSection}>
                        <p>
                            Title : {singleTask.title}
                        </p>
                        <p>
                            Description : {singleTask.description}
                        </p>
                        <div>
                            <Button
                                variant="danger"
                                onClick={this.handleDeleteTask}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                            <Button
                                variant="warning"
                                className="ml-3"
                                onClick={this.toggleEditModal}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                        </div>
                    </div>

                </div>
                {
                    isEditModal && <TaskModal
                        onHide={this.toggleEditModal}
                        onSubmit={this.handleEditTask}
                        editableTask={singleTask}
                    />
                }
            </>
        );
    }
}

export default SingleTask;