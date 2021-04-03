// import ContactForm from '../../ContactForm/ContactForm';
import ContactFormWithContext from '../../ContactForm/ContactFormWithContext';
import ContactProvider from '../../../context/providers/ContactProvider';
const Contact = (props) => {

    return (
        <div>
            <h1 style={{ fontSize: "70px" }}>Contact Page</h1>
            {/* <ContactForm /> */}
            <ContactProvider>
                <ContactFormWithContext />
            </ContactProvider>
        </div>
    )
}
export default Contact;