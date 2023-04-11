import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useContext} from "react";

export default function AppNavigation() {


    function Navigation() {
        return (<Navbar expand={"lg"} bg={"dark"} variant={"dark"}>
            <Container>
                <NavLink className={"navbar-brand"} to="/">PoS</NavLink>
                <Navbar.Toggle aria-controls={"navbarNavAltMarkup"}/>
                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav className={"me-auto"}>
                        <NavLink className={"nav-item nav-link"} to="/">Products</NavLink>
                        <NavLink className={"nav-item nav-link"} to="/create">Categories</NavLink>
                        <NavLink className={"nav-item nav-link"} to="/create">Bills</NavLink>
                        <NavLink className={"nav-item nav-link"} to="/pos">PoSes</NavLink>
                    </Nav>
                    <Nav>
                        <NavLink className={"nav-item nav-link"} id="nav-login" to="/login">Login</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
    }

    return Navigation();
}
