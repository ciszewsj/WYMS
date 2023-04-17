import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function AppNavigation() {


    function Navigation() {
        return (<Navbar expand={"lg"} bg={"dark"} variant={"dark"}>
            <Container>
                <NavLink className={"navbar-brand"} to="/">PoS</NavLink>
                <Navbar.Toggle aria-controls={"navbarNavAltMarkup"}/>
                <Navbar.Collapse id="navbarNavAltMarkup">
                    <Nav className={"me-auto"}>
                        <NavLink className={"nav-item nav-link"} to="/cart">Cart</NavLink>
                        <NavLink className={"nav-item nav-link"} to="/products">Products</NavLink>
                        <NavLink className={"nav-item nav-link"} to="/categories">Categories</NavLink>
                        <NavLink className={"nav-item nav-link"} to="/bills">Bills</NavLink>
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
