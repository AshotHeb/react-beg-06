import { Link } from 'react-router-dom';
import styles from './about.module.css';
import { Button } from 'react-bootstrap';
const About = (props) => {
    const pushAction = () => {
        console.log("About Props", props);
        props.history.push("/contact","ll");
    }
    const goAction = () => {
        console.log("Go", props.history.go);
        props.history.go(-1);
    }
    const goBack = () => {
        console.log("goBack", props.history.goBack);
        props.history.goBack();
    }
    const goForward =() =>{
        console.log("goForward", props.history.forward);
        props.history.goForward();
    }
    return (
        <div>
            <button>
                <Link to="/contact">To Contact</Link>
            </button>
            <h1 style={{ fontSize: "70px" }}>About Page</h1>

            <div className={styles.historyActions}>
                <Button
                    onClick={pushAction}
                >
                    To Contact
                </Button>
                <Button
                    onClick={goAction}
                    style={{marginTop:"10px"}}
                >
                    Go To back 1 page
                </Button>
                <Button
                    onClick={goBack}
                    style={{marginTop:"10px"}}
                >
                    Go Back
                </Button>
                <Button
                    onClick={goForward}
                    style={{marginTop:"10px"}}
                >
                    Go Forward
                </Button>

                <Button
                    onClick={()=>props.history.replace("/")}
                >
                   Block
                </Button>

            </div>
        </div>
    )
}
export default About;