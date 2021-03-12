import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const Confirm = (props) => {
    const { onHide, onSubmit, countOrOneTaskTitle } = props;
    const handleSubmit = () => {
        onSubmit();
        onHide();
    };
    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Do You want to delete {countOrOneTaskTitle} of tasks ?  </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
          </Button>
                <Button variant="danger"
                    onClick={handleSubmit}
                >
                    Delete All
          </Button>
            </Modal.Footer>
        </Modal>
    );
};

Confirm.propTypes = {
    onHide: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    countOrOneTaskTitle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}
export default Confirm;