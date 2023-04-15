import {Button, Container, Form, Image, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getProduct} from "./ProductRequests";
import {createPos, deletePos, updatePos} from "../pos/PosRequests";
import {getCurrentPrice, ProductTable} from "./ProductTableUtils";
import {timeToStr} from "../utils/TimeUtils";

let ProductSite = () => {
    let [form, setForm] = useState({})
    let [product, setProduct] = useState({})
    let [errorList, setErrorList] = useState([])
    let {id} = useParams();

    let DepositTable = ({date, description, type, value}) => {
        return <tr>
            <th scope="row">{date}</th>
            <td>{description}</td>
            <td>{type}</td>
            <td>{value}</td>
        </tr>
    }

    useEffect(() => {
        if (id != null) {
            getProduct(id, setProduct, setErrorList)
        }
    }, [])

    console.log(product)

    return <Container>
        <h1>Product: {product.name}</h1>
        {id && <>
            <Container style={{margin: "auto", textAlign: "center"}}>
                <Image style={{width: 480, height: 360}} src={product.image}/>
            </Container>
        </>}
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Code not available" defaultValue={product.code} readOnly={true}/>
                <Form.Text className="text-muted">
                    Value is not editable.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Category name" defaultValue={product.name} onChange={event => {
                    form.name = event.target.value
                    setForm({...form})
                    console.log(form)
                }
                }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="0.00"
                              defaultValue={product && product.priceList && getCurrentPrice(product.priceList)}
                              onChange={event => {
                                  form.pictureUrl = event.target.value
                                  setForm({...form})
                                  console.log(form)
                              }
                              }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Image URL"
                              defaultValue={product.category && product.category.name} onChange={event => {
                    form.pictureUrl = event.target.value
                    setForm({...form})
                    console.log(form)
                }
                }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Image URL" defaultValue={product.image} onChange={event => {
                    form.pictureUrl = event.target.value
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
        <Table responsive={"md"} striped={true} border={1} variant={"light"}>
            <thead>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Value</th>
            </tr>
            </thead>
            <tbody>
            {product.depositList && product.depositList.map(deposit =>
                <DepositTable type={deposit.type} value={deposit.value} description={deposit.description}
                              date={deposit.date && timeToStr(deposit.date)}/>)}
            <DepositTable date={"Total"}
                          value={product.depositList && product.depositList.length > 0
                              ? product.depositList.map(deposit => deposit.value).reduce((prev, next) => prev + next)
                              : 0}/>
            </tbody>
        </Table>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Number of products</Form.Label>
                <Form.Control type="text" placeholder="Number of products" defaultValue={0} onChange={event => {
                    form.name = event.target.value
                    setForm({...form})
                    console.log(form)
                }
                }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Optional description" defaultValue={""} onChange={event => {
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

export default ProductSite;
