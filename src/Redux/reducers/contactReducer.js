import types from '../actionTypes';
import {
    isRequired,
    maxLength,
    minLength,
    validateEmail
} from '../../utils/validators';

const maxLength30 = maxLength(30);
const minLength1 = minLength(1);

const initialState = {
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
}

const contactState = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_CONTACT_FORM: {

            const { name, value } = action.target;

            let valid = true;
            let error = isRequired(value) ||
                maxLength30(value) ||
                minLength1(value) ||
                (name === "email" && validateEmail(value));

            if (error)
                valid = false;

            return {
                ...state,
                [name]: {
                    valid,
                    error,
                    value
                }

            }
        }
        default: return state;
    }
}

export default contactState;