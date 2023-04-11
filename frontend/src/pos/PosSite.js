import {Button, Container, Form} from "react-bootstrap";
import {createPos, deletePos, getPos, updatePos} from "./PosRequests";
import {useState} from "react";
import {useEffect} from "react";
import {useParams} from "react-router-dom";

let PosSite = () => {
    let [form, setForm] = useState({})
    let [pos, setPos] = useState([])
    let [errorList, setErrorList] = useState([])
    let {id} = useParams();

    useEffect(() => {
        if (id != null) {
            getPos(id, setPos, setErrorList)
        }
    }, [])

    return <Container>
        <h1>Point Of Sale</h1>
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
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                if (id != null) {
                    updatePos(id, {name: form.name})
                } else {
                    createPos({name: form.name});
                }
            }}>
                Update
            </Button>
            {id &&
                <Button variant="danger" type="submit" onClick={(e) => {
                    deletePos(id)
                }}>
                    Delete
                </Button>
            }
        </Form>
    </Container>
}

export default PosSite;
