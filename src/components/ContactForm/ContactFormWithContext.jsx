import { contactPageContext } from '../../context/context';
import { Form, Button } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import { useContext } from 'react';


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

const ContactFormWithContext = () => {
    const context = useContext(contactPageContext);
    const {
        //state
        formData,
        loading,
        errorMessage,
        //functions
        handleChange,
        handleSubmit

    } = context;
    const inputs = inputsInfo.map((input, index) => {
        return (
            <Form.Group key={index}>
                <Form.Control
                    type={input.type}
                    placeholder={input.placeholder}
                    name={input.name}
                    onChange={handleChange}
                    value={formData[input.name].value}
                    as={undefined ?? input.as}
                    rows={undefined ?? input.rows}
                />
                <Form.Text style={{ color: "red" }}>{formData[input.name].error}</Form.Text>
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
        </>
    );
}

export default ContactFormWithContext;