import { useState } from 'react';
import { contactPageContext } from '../context';
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


const ContactProvider = (props) => {
    const [formData, setFormData] = useState({
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
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = ({ target: { name, value } }) => {
        let valid = true;


        let error = isRequired(value) ||
            maxLength30(value) ||
            minLength1(value) ||
            (name === "email" && validateEmail(value));

        if (error)
            valid = false;


        setFormData({
            ...formData,
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        });
    }

    const handleSubmit = () => {

        const formDataCopy = { ...formData };
        for (let key in formDataCopy) {
            if (typeof formDataCopy[key] === "object" && formDataCopy[key].hasOwnProperty("value")) {
                formDataCopy[key] = formDataCopy[key].value;
            } else {
                delete formDataCopy[key];
            }
        }

        setLoading(true);
        setErrorMessage("");
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
                setLoading(false);
                setErrorMessage(error.message);
                console.log("Form Contact Request Errror", error);
            });
    }
    return <contactPageContext.Provider
        value={{
            //state
            formData: formData,
            loading: loading,
            errorMessage,
            //functions
            handleChange: handleChange,
            handleSubmit: handleSubmit
        }}
    >
        {props.children}
    </contactPageContext.Provider>

}

export default withRouter(ContactProvider);