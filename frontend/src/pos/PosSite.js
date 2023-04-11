import {Button, Container, Form} from "react-bootstrap";
import {createPos} from "./PosRequests";
import {useState} from "react";

let PosSite = () => {
    let [form, setForm] = useState({})

    return <Container>
        <h1>Point Of Sale</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Id</Form.Label>
                <Form.Control type="email" placeholder="Id not available" readOnly={true}/>
                <Form.Text className="text-muted">
                    Value is not editable.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="PoS name" onChange={event => {
                    form.name = event.target.value
                    setForm({...form})
                    console.log(form)
                }
                }/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                createPos({name: form.name});
            }}>
                Submit
            </Button>
        </Form>
    </Container>
}

export default PosSite;
