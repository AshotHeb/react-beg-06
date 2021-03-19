import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

const Navbar = () => {
    return (
        <Nav>
            <Nav.Item>
                <NavLink
                    to="/"
                    className="nav-link"
                    // activeStyle={{ color: "red" }}
                    activeClassName={styles.activeNavLink}
                    exact={true}
                >
                    Home
                    </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    to="/contact"
                    // activeStyle={{ color: "red" }}
                    className="nav-link"
                    exact={true}
                    activeClassName={styles.activeNavLink}
                >
                    Contact
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink
                    to="/about"
                    className="nav-link"
                    // activeStyle={{ color: "red" }}
                    activeClassName={styles.activeNavLink}
                    exact={true}
                >
                    About
                    </NavLink>
            </Nav.Item>
        </Nav>
    );
}

export default Navbar;

