import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {MockedUser, SettingsContext} from "../objects/Settings";

let LoginSite = () => {
    const navigate = useNavigate();

    let [data, setData] = useState({})
    const [settings, setSettings] = useContext(SettingsContext);
    return <Container>
        <h1>Login</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" placeholder="Login" defaultValue={""} onInput={event => {
                    data.value = event.target.value
                    setData({...data})
                }
                }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" defaultValue={""} onChange={event => {
                    data.password = event.target.value
                    setData({...data})
                }
                }/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                if (data.value === MockedUser().login && data.password === MockedUser().password) {
                    settings.token = MockedUser().id
                    settings.userName = MockedUser().login
                    setSettings({...settings})
                    navigate("/")
                } else {
                    console.log("BAD PASSWORD")
                }
            }}>
                Login
            </Button>
        </Form>
    </Container>
}
export default LoginSite
