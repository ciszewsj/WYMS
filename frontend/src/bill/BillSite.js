import {Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getBill, makeReturn} from "./BillRequests";
import {useNavigate, useParams} from "react-router-dom";
import {BillItemTable} from "./BillItemTable";
import {timeToStr} from "../utils/TimeUtils";
import {deleteCategory} from "../category/CategoryRequests";
import {RequiredLogin} from "../objects/AppNavigation";
import {getBillFiles} from "../files/FileRequest";

let BillSite = () => {
    const navigate = useNavigate();

    let [bill, setBill] = useState({})
    let [errors, setErrors] = useState([])

    let [returnForm, setReturnForm] = useState({})
    let [errorsForm, setErrorsForm] = useState([])


    let {id} = useParams();

    useEffect(() => {
        getBill(id, setBill, setErrors)
    }, [errors])

    return <RequiredLogin>
        <Container>
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
            <BillItemTable products={bill.cartItemList} navigate={navigate}/>
            <h2>Returned</h2>
            <BillItemTable products={bill.returnsItemList} navigate={navigate}/>
            <h2>Return Product</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example"
                                 onChange={event => {
                                     returnForm.productId = Number(event.target.value)
                                     setReturnForm({...returnForm})
                                 }}
                                 value={returnForm.productId}
                    >
                        <option value="-1">No Product</option>
                        {bill.cartItemList &&
                            bill.cartItemList.map(cartItem => {
                                return <option key={cartItem.product.id}
                                               value={cartItem.product.id}>{cartItem.product.name} - {cartItem.product.code}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="0"
                                  defaultValue="0"
                                  onChange={event => {
                                      returnForm.amount = Number(event.target.value)
                                      setReturnForm({...returnForm})
                                  }}
                    />
                </Form.Group>
                <Button variant="danger" type="submit" onClick={(e) => {
                    e.preventDefault()
                    makeReturn(id, returnForm, setErrors)
                }}>
                    Make Return
                </Button>
            </Form>
        </Container>
        <Button variant="primary" type="submit" onClick={(e) => {
            e.preventDefault()
            getBillFiles(id)
        }}>
            Print Bill
        </Button>
    </RequiredLogin>
}
export default BillSite;
