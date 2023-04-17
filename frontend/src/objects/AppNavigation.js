import {Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "./Settings";
import {getPoses} from "../pos/PosRequests";
import {Navigate} from "react-router-dom";

export default function AppNavigation() {
    const [settings, setSettings] = useContext(SettingsContext);

    let [poses, setPoses] = useState([])
    let [posesError, setPosesError] = useState([])

    let [name, setName] = useState("Choose PoS")

    useEffect(() => {
        getPoses(setPoses, setPosesError)
    }, [settings])

    // if (window.location.pathname !==)

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
                        {settings.userName == null ?
                            <NavLink className={"nav-item nav-link"} id="nav-login" to="/login">Login</NavLink> :
                            <Dropdown onChange={event => console.log(event)}>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {String(name)}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={event => {
                                            event.preventDefault()
                                            setName("Choose PoS")
                                            settings.cartId = null
                                            setSettings({...settings})
                                        }}
                                    >None</Dropdown.Item>
                                    {poses.map(pos => {
                                        return <Dropdown.Item key={pos.id}
                                                              onClick={event => {
                                                                  event.preventDefault()
                                                                  setName(pos.name)
                                                                  settings.cartId = pos.id
                                                                  setSettings({...settings})
                                                              }}
                                        >{pos.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>)
    }

    return Navigation();
}

export let RequiredLogin = (props) => {
    const [settings, setSettings] = useContext(SettingsContext);
    if (settings.token == null) {
        console.log("123???")
        return (
            <Navigate
                to={"/login"}
            />
        );
    }
    return props.children;
};
