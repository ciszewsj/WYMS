import {Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getBill} from "./BillRequests";
import {useParams} from "react-router-dom";
import {BillItemTable} from "./BillItemTable";
import {timeToStr} from "../utils/TimeUtils";

let BillSite = () => {
    let [bill, setBill] = useState({})
    let [errors, setErrors] = useState([])
    let {id} = useParams();

    useEffect(() => {
        getBill(id, setBill, setErrors)
    }, [])

    return <Container>
        <h1>Bill: {bill.id}</h1>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Id</Form.Label>
                <Form.Control type="email" placeholder="Id not available" defaultValue={bill.id} readOnly={true}/>
                <Form.Text className="text-muted">
                    Value is not editable.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>CashierId</Form.Label>
                <Form.Control type="email" placeholder="Id not available" defaultValue={bill.cashierId}
                              readOnly={true}/>
                <Form.Text className="text-muted">
                    Value is not editable.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Date</Form.Label>
                <Form.Control type="email" placeholder="Id not available"
                              defaultValue={bill.date && timeToStr(bill.date)}
                              readOnly={true}/>
                <Form.Text className="text-muted">
                    Value is not editable.
                </Form.Text>
            </Form.Group>
        </Form>
        <h2>Bought</h2>
        <BillItemTable products={bill.cartItemList}/>
        <h2>Returned</h2>
        <BillItemTable products={bill.returnsItemList}/>

    </Container>
}
export default BillSite;
