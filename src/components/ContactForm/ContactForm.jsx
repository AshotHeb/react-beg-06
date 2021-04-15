import { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import {
    changeContactForm,
    sendContactFromThunk
} from '../../Redux/action';




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






const ContactForm = (props) => {
    const {
        formData,
        loading,
        //function
        changeContactForm,
        sendContactFromThunk
    } = props;
    const firstInput = useRef(null);

    useEffect(() => {
        firstInput.current.focus();
    }, []);

    const inputs = inputsInfo.map((input, index) => {
        return (
            <Form.Group key={index}>
                <Form.Control
                    ref={index === 0 ? firstInput : null}
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={(e) => changeContactForm(e.target)}
                    value={formData[input.name].value}
                    as={undefined ?? input.as}
                    rows={undefined ?? input.rows}
                    autoComplete={"on"}
                />
                <Form.Text style={{ color: "red" }}>{formData[input.name].error}</Form.Text>
            </Form.Group>
        );
    });


    return (
        <>
            <Form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: "550px", margin: "48px auto 0px" }} noValidate>
                {/* <h2 className="mb-5" style={{ color: "red" }}>{errorMessage}</h2> */}
                {inputs}
                <Button
                    variant="primary"
                    type="submit"
                    onClick={() => sendContactFromThunk(formData, props.history)}
                >
                    Send
        </Button>
            </Form>
            {
                loading && <Spinner />
            }

        </>
    );
}

const mapStateToProps = (state) => {
    const {
        name,
        email,
        message
    } = state.contactState;
    return {
        formData: {
            name,
            email,
            message
        },
        loading: state.globalState.loading
    }
}
const mapDispatchToProps = {
    changeContactForm,
    sendContactFromThunk
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactForm));