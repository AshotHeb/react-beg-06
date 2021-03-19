import { Link } from 'react-router-dom';
const About = () => {
    return (
        <div>
            <button>
                <Link to="/contact">To Contact</Link>
            </button>
            <h1 style={{ fontSize: "70px" }}>About Page</h1>
        </div>
    )
}
export default About;