import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

const navItems = [
    {
        to: "/",
        value: "Home"
    },
    {
        to: "/contact",
        value: "Contact"
    },
    {
        to: "/about",
        value: "About"
    },
];

const Navbar = () => {
    const navItemsJSX = navItems.map((navItem, index) => {
        return (
            <Nav.Item key={index}>
                <NavLink
                    to={navItem.to}
                    className="nav-link"
                    activeClassName={styles.activeNavLink}
                    exact={true}
                >
                    {navItem.value}
                </NavLink>
            </Nav.Item>
        );
    });

    return (
        <Nav>
            {navItemsJSX}
        </Nav>
    );
}

export default Navbar;

