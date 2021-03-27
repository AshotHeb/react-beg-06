import React from 'react';
import { Form, Button } from 'react-bootstrap';

const inputsInfo = [
    {
        name: "name",
        type: "text",
        placeholder: "Name"
    },
    {
        name: "email",
        type: "email",
        placeholder: "Email"
    },
    {
        name: "message",
        type: null,
        placeholder: "Your Message",
        as: "textarea",
        rows: 3
    }
]

class ContactForm extends React.Component {
    state = {
        name: "",
        email: "",
        message: "",
        loading: false
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
            [name]: value
        });
    }
    handleSubmit = () => {
        const formData = { ...this.state };
        delete formData.loading;
        console.log("formData =>", formData);
    }
    render() {
        const inputs = inputsInfo.map((input, index) => {
            return (
                <Form.Group key={index}>
                    <Form.Control
                        type={input.type}
                        placeholder={input.placeholder}
                        name={input.name}
                        onChange={this.handleChange}
                        value={this.state[input.name]}
                        as={undefined ?? input.as}
                        rows={undefined ?? input.rows}
                    />
                </Form.Group>
            );
        });


        return (
            <Form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "550px", margin: "48px auto 0px" }}>
                {inputs}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Send
            </Button>
            </Form>
        )
    }
}
export default ContactForm;