import {Button, Container, Form} from "react-bootstrap";
import {createPos, deletePos, getPos, updatePos} from "./PosRequests";
import {useState} from "react";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {RequiredLogin} from "../objects/AppNavigation";

let PosSite = () => {
    const navigate = useNavigate();

    let [form, setForm] = useState({})
    let [pos, setPos] = useState({})
    let [errorList, setErrorList] = useState({})
    let {id} = useParams();


    useEffect(() => {
        if (id != null) {
            getPos(id, setPos, setErrorList)
        }
    }, [])

    useEffect(() => {
        console.log(errorList)
        if (errorList.status === 201) {
            if (errorList.id) {
                navigate("/pos/" + errorList.id)
                return;
            }
        } else if (errorList.status === 500) {
            navigate("/error")
            return;
        } else if (errorList.status === 300) {
            navigate("/pos")
            return;
        }
    }, [errorList])

    console.log(errorList)
    return <RequiredLogin>
        <Container>
            <h1>Point Of Sale: {pos.name}</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="email" placeholder="Id not available" defaultValue={pos.id} readOnly={true}/>
                    <Form.Text className="text-muted">
                        Value is not editable.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="PoS name" defaultValue={pos.name} onChange={event => {
                        form.name = event.target.value
                        setForm({...form})
                        console.log(form)
                    }
                    }/>
                    {errorList && errorList.name &&
                        <Form.Text className="text-muted">
                            {errorList.name}
                        </Form.Text>
                    }
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    setErrorList({})
                    if (id != null) {
                        updatePos(id, {name: form.name}, setErrorList)
                    } else {
                        createPos({name: form.name}, setErrorList);
                    }
                }}>
                    Update
                </Button>
                {id &&
                    <Button variant="danger" type="submit" onClick={(e) => {
                        e.preventDefault()
                        setErrorList({})
                        deletePos(id, setErrorList)
                    }}>
                        Delete
                    </Button>
                }
            </Form>
        </Container>
    </RequiredLogin>
}

export default PosSite;
