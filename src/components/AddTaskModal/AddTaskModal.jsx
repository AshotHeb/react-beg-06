import React, { createRef } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

class AddTaskModal extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = createRef();
        this.state = {
            title: "",
            description: ""
        }
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
            title,
            description
        }
        this.props.onSubmit(formData);
        this.props.onHide();
    }
    componentDidMount() {
        this.inputRef.current.focus();
    }
    render() {
        const { onHide, isAnyTaskChecked } = this.props;
        const { title, description } = this.state;
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
                        Add Task Modal
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
                                disabled={isAnyTaskChecked}
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
                                disabled={isAnyTaskChecked}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} variant="secondary">Close</Button>
                    <Button
                        onClick={this.handleS}
                        disabled={isAnyTaskChecked || !title || !description}
                    >
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddTaskModal;