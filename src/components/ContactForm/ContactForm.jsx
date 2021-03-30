import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import {
    isRequired,
    maxLength,
    minLength,
    validateEmail
} from '../../utils/validators';
const API_HOST = "http://localhost:3001";


//validators
const maxLength30 = maxLength(30);
const minLength1 = minLength(1);


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
        name: {
            valid: false,
            error: null,
            value: ""
        },
        email: {
            valid: false,
            error: null,
            value: ""
        },
        message: {
            valid: false,
            error: null,
            value: ""
        },
        loading: false,
        errorMessage: ""

    }

    handleChange = ({ target: { name, value } }) => {
        let valid = true;

        // if (isRequired(value)) {
        //     valid = false;
        //     error = isRequired(value);
        // } else if (maxLength30(value)) {
        //     valid = false;
        //     error = maxLength30(value);
        // }
        let error = isRequired(value) ||
            maxLength30(value) ||
            minLength1(value) ||
            (name === "email" && validateEmail(value));

        if (error)
            valid = false;


        this.setState({
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        });
    }
    handleSubmit = () => {
        // Object.keys(formData[key]).includes("value")
        const formData = { ...this.state };
        for (let key in formData) {
            if (typeof formData[key] === "object" && formData[key].hasOwnProperty("value")) {
                formData[key] = formData[key].value;
            } else {
                delete formData[key];
            }
        }



        // if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
        this.setState({ loading: true, errorMessage: null });   //Loading Started 
        fetch(`${API_HOST}/form`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error;
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({ loading: false, errorMessage: error.message });   //Loading Ended 
                console.log("Form Contact Request Errror", error);
            });
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
                        value={this.state[input.name].value}
                        as={undefined ?? input.as}
                        rows={undefined ?? input.rows}
                    />
                    <Form.Text style={{ color: "red" }}>{this.state[input.name].error}</Form.Text>
                </Form.Group>
            );
        });


        return (
            <>
                <Form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "550px", margin: "48px auto 0px" }} novalidate>
                    <h2 className="mb-5" style={{ color: "red" }}>{this.state.errorMessage}</h2>
                    {inputs}
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={this.handleSubmit}
                    >
                        Send
            </Button>
                </Form>
                {
                    this.state.loading && <Spinner />
                }
            </>
        )
    }
}
export default withRouter(ContactForm);