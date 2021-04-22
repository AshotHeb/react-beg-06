import React, { useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import formatDate from '../../utils/dateFormatter';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    changeModalInput,
    changeModalDate,
    setEditableTaskToModalState,
    resetTaskModalState
} from '../../Redux/action';

const TaskModal = (props) => {
    const {
        //state
        editableTask,
        //functions
        onHide,
        changeModalInput,
        changeModalDate,
        setEditableTaskToModalState,
        onSubmit,
        resetTaskModalState
    } = props;
    const {
        title,
        description,
        date
    } = props.state;
    const inputRef = useRef(null);
    const handleS = ({ key, type }) => {
        if (
            !title ||
            !description ||
            (type === 'keypress' && key !== 'Enter')
        )
            return;
        const formData = {
            ...props.state,
            date: formatDate(date)
        }
        onSubmit(formData);

    }
    useEffect(() => {
        editableTask && setEditableTaskToModalState(editableTask);
        inputRef.current.focus();
        return () => {
            resetTaskModalState();
        }
    }, [setEditableTaskToModalState, editableTask])



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
                            onChange={(e) => changeModalInput(e.target)}
                            onKeyPress={handleS}
                            ref={inputRef}
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
                            onChange={(e) => changeModalInput(e.target)}
                            value={description}
                        />
                    </Form.Group>
                    <Form.Group >
                        <DatePicker
                            selected={date}
                            onChange={date => changeModalDate(date)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={(event) => onHide()} variant="secondary">Close</Button>
                <Button
                    onClick={handleS}
                    disabled={!title || !description}
                >
                    {editableTask ? "Save" : "Add Task"}
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
TaskModal.propTypes = {
    onHide: PropTypes.func.isRequired,
    editableTask: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

const mapStatToProps = (state) => {

    return {
        state: state.taskModalState
    }
}

const mapDispatchToProps = {
    changeModalInput,
    changeModalDate,
    setEditableTaskToModalState,
    resetTaskModalState

}
export default connect(mapStatToProps, mapDispatchToProps)(TaskModal);