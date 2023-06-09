import {Button, Container, Form, Image, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {correctDeposit, createProduct, getProduct, updateProduct} from "./ProductRequests";
import {timeToStr} from "../utils/TimeUtils";
import {getCurrentPrice, longToPrice} from "../utils/MoneyUtils";
import {getCategories} from "../category/CategoryRequests";
import {RequiredLogin} from "../objects/AppNavigation";
import {v4 as uuidv4} from 'uuid';

let ProductSite = () => {
    const navigate = useNavigate();

    let [formProduct, setFormProduct] = useState({})
    let [categories, setCategories] = useState([])
    let [formDeposit, setFormDeposit] = useState({})
    let [errorList, setErrorList] = useState([])
    let [errorListCategories, setErrorListCategories] = useState([])
    let [response, setResponse] = useState({})
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
            <th>{dateStart}</th>
            <td>{dateStop}</td>
            <td>{price} PLN</td>
        </tr>
    }

    useEffect(() => {
        console.log(errorList)
        if (errorList.status === 201) {
            if (errorList.code) {
                navigate("/products/" + errorList.code)
                return;
            } else {
                getProduct(id, setFormProduct, setErrorList)
            }
        } else if (errorList.status === 500) {
            navigate("/error")
            return;
        } else if (errorList.status === 300) {
            navigate("/products")
            return;
        }
    }, [errorList])

    useEffect(() => {
        if (id != null) {
            getProduct(id, setFormProduct, setErrorList)
        } else {
            formProduct.code = uuidv4()
            setFormProduct({...formProduct})
        }
    }, [])

    useEffect(() => {
        getCategories(setCategories, setErrorListCategories)
    }, [])
    console.log(formProduct)
    return <RequiredLogin>
        <Container>
            <h1>Product: {formProduct.name}</h1>
            {id && <>
                <Container style={{margin: "auto", textAlign: "center"}}>
                    <Image style={{width: 480, height: 360}} src={formProduct.image}/>
                </Container>
            </>}
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Code</Form.Label>
                    <Form.Control type="text" placeholder="Code not available"
                                  defaultValue={formProduct.code}
                                  onChange={event => {
                                      formProduct.code = event.target.value
                                      setFormProduct({...formProduct})
                                  }}/>
                    {errorList && errorList.code &&
                        <Form.Text className="text-muted">
                            {errorList.code}
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Product name" defaultValue={formProduct.name}
                                  onChange={event => {
                                      formProduct.name = event.target.value
                                      setFormProduct({...formProduct})
                                  }
                                  }/>
                    {errorList && errorList.name &&
                        <Form.Text className="text-muted">
                            {errorList.name}
                        </Form.Text>
                    }
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder="0.00"
                                  defaultValue={formProduct && formProduct.priceList && getCurrentPrice(formProduct.priceList)}
                                  onChange={event => {
                                      formProduct.price = Number(event.target.value).toFixed(2)
                                      formProduct.price = formProduct.price * 100
                                      setFormProduct({...formProduct})
                                      event.target.value = (formProduct.price / 100).toFixed(2).toString()
                                  }
                                  }/>
                    {errorList && errorList.price &&
                        <Form.Text className="text-muted">
                            {errorList.price}
                        </Form.Text>
                    }
                </Form.Group>
                {!id &&
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="number" placeholder="0"
                                      defaultValue="0"
                                      onChange={event => {
                                          formProduct.amount = Number(event.target.value)
                                          setFormProduct({...formProduct})
                                          console.log(formProduct)
                                      }
                                      }/>
                        {errorList && errorList.amount &&
                            <Form.Text className="text-muted">
                                {errorList.amount}
                            </Form.Text>
                        }
                    </Form.Group>}

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Category</Form.Label>
                    <Form.Select aria-label="Default select example"
                                 onChange={event => {
                                     console.log(event.target.value)
                                     formProduct.categoryId = Number(event.target.value)
                                     setFormProduct({...formProduct})
                                 }}
                                 value={formProduct.categoryId}>
                        <option value="-1">No category</option>
                        {categories &&
                            categories.map(category => {
                                return <option key={category.id} value={category.id}>{category.name} </option>
                            })
                        }
                    </Form.Select>
                    {errorList && errorList.categoryId &&
                        <Form.Text className="text-muted">
                            {errorList.categoryId}
                        </Form.Text>
                    }
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" placeholder="Image URL" defaultValue={formProduct.image}
                                  onChange={event => {
                                      formProduct.image = event.target.value
                                      setFormProduct({...formProduct})
                                      console.log(formProduct)
                                  }
                                  }/>
                    {errorList && errorList.image &&
                        <Form.Text className="text-muted">
                            {errorList.image}
                        </Form.Text>
                    }
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    console.log("cliecked?", formProduct)
                    if (id != null) {
                        updateProduct(id, formProduct, setErrorList)
                    } else {
                        console.log(123)
                        createProduct(formProduct, setErrorList);
                    }
                }}>
                    Update
                </Button>
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
                    {formProduct.depositList && formProduct.depositList.map(deposit =>
                        <DepositTable key={deposit.id}
                                      type={deposit.type} value={deposit.value} description={deposit.description}
                                      date={deposit.date && timeToStr(deposit.date)}/>)}
                    <DepositTable date={"Total"}
                                  value={formProduct.depositList && formProduct.depositList.length > 0
                                      ? formProduct.depositList.map(deposit => deposit.value).reduce((prev, next) => prev + next)
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
                        <Form.Control type="text" placeholder="Optional description" defaultValue={""}
                                      onChange={event => {
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
                    {formProduct.priceList && formProduct.priceList.map(price =>
                        <PriceTable key={price.id}
                                    price={price.value && longToPrice(price.value)} dateStart={timeToStr(price.start)}
                                    dateStop={price.end ? timeToStr(price.end) : "-"}/>)}
                    </tbody>
                </Table>
            </>}
        </Container>
    </RequiredLogin>
}

export default ProductSite;
