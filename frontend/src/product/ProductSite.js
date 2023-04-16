import {Button, Container, Form, Image, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {correctDeposit, getProduct, updateProduct} from "./ProductRequests";
import {createPos, deletePos, updatePos} from "../pos/PosRequests";
import {timeToStr} from "../utils/TimeUtils";
import {getCurrentPrice, longToPrice} from "../utils/MoneyUtils";

let ProductSite = () => {
    let [formProduct, setFormProduct] = useState({})
    let [formDeposit, setFormDeposit] = useState({})
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

    let PriceTable = ({dateStart, dateStop, price}) => {
        return <tr>
            <td>{dateStart}</td>
            <td>{dateStop}</td>
            <td>{price}</td>
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
                <Form.Control type="text" placeholder="Product name" defaultValue={product.name} onChange={event => {
                    formProduct.name = event.target.value
                    setFormProduct({...formProduct})
                    console.log(formProduct)
                }
                }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="0.00"
                              defaultValue={product && product.priceList && getCurrentPrice(product.priceList)}
                              onChange={event => {
                                  formProduct.price = Number(event.target.value)
                                  setFormProduct({...formProduct})
                                  console.log(formProduct)
                              }
                              }/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Image URL"
                              defaultValue={product.category && product.category.name} onChange={event => {
                    formProduct.categoryId = event.target.value
                    setFormProduct({...formProduct})
                    console.log(formProduct)
                }
                }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Image URL" defaultValue={product.image} onChange={event => {
                    formProduct.image = event.target.value
                    setFormProduct({...formProduct})
                    console.log(formProduct)
                }
                }/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => {
                e.preventDefault();
                if (id != null) {
                    updateProduct(id, formProduct)
                } else {
                    createPos({name: formProduct.name});
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
        {id && <>
            <h2>Deposit list:</h2>
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
                    <DepositTable key={deposit.id}
                                  type={deposit.type} value={deposit.value} description={deposit.description}
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
                    <Form.Control type="text" placeholder="Number of products" defaultValue={0} onInput={event => {
                        formDeposit.value = event.target.value
                        setFormProduct({...formDeposit})
                    }
                    }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Optional description" defaultValue={""} onChange={event => {
                        formDeposit.description = event.target.value
                        setFormProduct({...formDeposit})
                    }
                    }/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    correctDeposit(id, formDeposit)
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
            <h2>Price list:</h2>
            <Table responsive={"md"} striped={true} border={1} variant={"light"}>
                <thead>
                <tr>
                    <th>Date from</th>
                    <th>Date to</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {product.priceList && product.priceList.map(price =>
                    <PriceTable price={price.value && longToPrice(price.value)} dateStart={timeToStr(price.start)}
                                dateStop={price.end ? timeToStr(price.end) : "-"}/>)}
                </tbody>
            </Table>
        </>}
    </Container>
}

export default ProductSite;
