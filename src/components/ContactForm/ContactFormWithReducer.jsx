import { useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
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
];


const initialState = {
    formData: {
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
        }
    },
    loading: false,
    // errorMessage: ""
    counter: 0

}

const reducer = (state = initialState, action) => {
    //action.type
    switch (action.type) {
        case "+": {
            return {
                ...state,
                plus: true,
                counter: state.counter + 1
            }
        }
        case "-": {
            return {
                ...state,
                counter: state.counter - 1
            }
        }
        case "change": {
            const { target } = action;
            const { name, value } = target;

            let valid = true;
            let error = isRequired(value) ||
                maxLength30(value) ||
                minLength1(value) ||
                (name === "email" && validateEmail(value));

            if (error)
                valid = false;

            return {
                ...state,
                formData: {
                    ...state.formData,
                    [name]: {
                        valid,
                        error,
                        value
                    }
                }

            }

        }
        // case "setOrRemoveLoading": {
        //     return {
        //         ...state,
        //         loading: action.isLoading
        //     }
        // }
        case "SET_LOADING": {
            return {
                ...state,
                loading: true,
                errorMessage: ""
            }
        }
        case "REMOVE_LOADING": {
            return {
                ...state,
                loading: false
            }
        }
        case "SET_ERROR_MESSAGE": {
            return {
                ...state,
                errorMessage: action.error
            }
        }
        default: return state;
    }

}

const ContactFormWithReducer = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {
        //state
        formData,
        loading,
        errorMessage

    } = state;

    // const handleChange = (e) => {
    //     const { target } = e;
    //     const action = {
    //         type: "change",
    //         target: target

    //     }
    //     dispatch(action);
    // }
    const handleSubmit = () => {
        const formDataCopy = { ...state.formData };
        for (let key in formDataCopy) {
            if (typeof formDataCopy[key] === "object" && formDataCopy[key].hasOwnProperty("value")) {
                formDataCopy[key] = formDataCopy[key].value;
            } else {
                delete formDataCopy[key];
            }
        }

        dispatch({ type: "SET_LOADING" }); //loading Started
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
                props.history.push("/");
            })
            .catch(error => {
                dispatch({ type: "REMOVE_LOADING" }); //loading Ended
                dispatch({ type: "SET_ERROR_MESSAGE", error: error.message });
                console.log("Form Contact Request Errror", error);
            });
    }

    const inputs = inputsInfo.map((input, index) => {
        return (
            <Form.Group key={index}>
                <Form.Control
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={(e) => dispatch({ type: "change", target: e.target })}
                    value={formData[input.name].value}
                    as={undefined ?? input.as}
                    rows={undefined ?? input.rows}
                />
                <Form.Text style={{ color: "red" }}>{state.formData[input.name].error}</Form.Text>
            </Form.Group>
        );
    });


    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "550px", margin: "48px auto 0px" }} noValidate>
                <h2 className="mb-5" style={{ color: "red" }}>{errorMessage}</h2>
                {inputs}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Send
        </Button>
            </Form>
            {
                loading && <Spinner />
            }
            <div>
                Counter :{state.counter}
                <button onClick={() => dispatch({ type: "+" })}>+</button>
                <button onClick={() => dispatch({ type: "-" })}>-</button>
            </div>
        </>
    );
}

export default withRouter(ContactFormWithReducer);