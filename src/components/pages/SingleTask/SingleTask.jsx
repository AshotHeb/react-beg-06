import React from 'react';
import styles from './singleTask.module.css'
import {Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
const API_HOST = "http://localhost:3001";
class SingleTask extends React.Component {
    state = {
        singleTask: null
    }
    componentDidMount() {
        const {id} = this.props.match.params;
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
                console.log("Single Task Get Request ", error);
            });
    }
    render() {

        const {singleTask} = this.state;
        if(!singleTask) return <p>Loading...</p>
        return (
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
                  
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
                <Button
                    variant="warning"
                    className="ml-3"
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>
                </div>
                
            </div>
        );
    }
}

export default SingleTask;