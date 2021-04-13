import React, { createRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import formatDate from '../../utils/dateFormatter';
import PropTypes from 'prop-types';

class TaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: "",
            description: "",
            //2020-03-14
            ...props.editableTask,
            date: props.editableTask ? new Date(props.editableTask.date) : new Date()
        }
    }
    setDate = (date) => {
        this.setState({
            date
        });
    }
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }
    handleS = ({ key, type }) => {
        const { title, description } = this.state;
        if (!title ||
            !description ||
            (type === 'keypress' && key !== 'Enter')
        )
            return;
        const formData = {
            ...this.state,
            date: formatDate(this.state.date)
        }
        this.props.onSubmit(formData);
     
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { onHide, editableTask } = this.props;
        const { title, description, date } = this.state;
        return (
            <Modal
                show={true}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {editableTask ? "Edit Task Modal" : "Add Task Modal"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mb-5 mt-5" onSubmit={(e) => e.preventDefault()}>
                        <Form.Group >
                            <Form.Control
                                name="title"
                                type="text"
                                placeholder="Title"
                                onChange={this.handleChange}
                                onKeyPress={this.handleS}
                                ref={this.inputRef}
                                value={title}
                            />

                        </Form.Group>
                        <Form.Group >
                            <Form.Control
                                name="description"
                                as="textarea"
                                rows={3}
                                style={{ resize: "none" }}
                                placeholder="Description"
                                onChange={this.handleChange}
                                value={description}
                            />
                        </Form.Group>
                        <Form.Group >
                            <DatePicker
                                selected={date}
                                onChange={date => this.setDate(date)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={(event) => onHide()} variant="secondary">Close</Button>
                    <Button
                        onClick={this.handleS}
                        disabled={!title || !description}
                    >
                        {editableTask ? "Save" : "Add Task"}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
TaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    editableTask: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}
export default TaskModal;