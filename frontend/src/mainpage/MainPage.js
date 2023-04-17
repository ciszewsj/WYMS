import {Button, Card, CardGroup, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProducts} from "../product/ProductRequests";
import {useNavigate} from "react-router-dom";
import {getCurrentPrice} from "../utils/MoneyUtils";
import {addProductToCart} from "../cart/CartRequests";
import {useContext} from "react";
import {SettingsContext} from "../objects/Settings";
import {RequiredLogin} from "../objects/AppNavigation";

let MainPage = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useContext(SettingsContext);

    let [products, setProducts] = useState([])
    let [productsShow, setProductsShow] = useState([])
    let [errorList, setErrorList] = useState([])

    let [sortBy, setSortBy] = useState(0)
    let [asc, setAsc] = useState(0)
    let [filterBy, setFilterBy] = useState(0)
    let [filter, setFilter] = useState("")

    useEffect(() => {
        getProducts(setProducts, setErrorList)
    }, [])

    useEffect(() => {
        let productsShow = [...products]
        let tmp = []
        if (filter && filter.length >0) {
            if (filterBy === 0) {

            } else if (filterBy === 1) {
                for (let index in productsShow) {
                    console.log(productsShow[index].name)
                    if (productsShow[index].name.includes(filter)) {
                        tmp.push(productsShow[index])
                    }
                }
                productsShow = tmp
            } else if (filterBy === 2) {
                for (let index in productsShow) {
                    if (productsShow[index].code.includes(filter)) {
                        tmp.push(productsShow[index])
                    }
                }
                productsShow = tmp
            }
        }


        if (sortBy === 0) {
        } else if (sortBy === 1) {
            productsShow = productsShow.sort((a, b) => asc === 0 ? a.code < b.code ? -1 : 1 : a.code > b.code ? -1 : 1)
        } else if (sortBy === 2) {
            productsShow = productsShow = productsShow.sort((a, b) => asc === 0 ? a.price < b.price ? -1 : 1 : a.price > b.price ? -1 : 1)
        } else if (sortBy === 3) {
            productsShow = productsShow.sort((a, b) => asc === 0 ? a.categoryId < b.categoryId ? -1 : 1 : a.categoryId > b.categoryId ? -1 : 1)
        } else if (sortBy === 4) {
            productsShow = productsShow.sort((a, b) => asc === 0 ? a.name < b.name ? -1 : 1 : a.categoryId > b.categoryId ? -1 : 1)
        }

        setProductsShow([...productsShow])

    }, [products, sortBy, asc, filter, filterBy])

    let ProductCard = ({product}) => {
        return (<Card style={{width: '18rem'}}
                      onClick={e => {
                          e.preventDefault()
                          addProductToCart(settings.cartId, {productId: product.id, amount: 1}, setErrorList)
                          console.log("CLICKED !@#?")
                      }}
        >
            <Card.Img variant="top" style={{width: 240, height: 180}} src={product.image}/>
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    Price:{product.priceList ? getCurrentPrice(product.priceList) : 0.00} PLN
                    <br/>
                    Category:{product.category && product.category.name}
                    <br/>
                    Code:{product.code}
                </Card.Text>
                <Button variant="link" onClick={e => {
                    e.preventDefault()
                    navigate('/products/' + product.code)
                }}>Edit Product</Button>
            </Card.Body>
        </Card>)
    }
    let a = ["None", "Code", "Price", "Category", "Name"]
    let b = ["ASC", "DESC"]
    let c = ["None", "Name", "Code"]
    return <RequiredLogin>
        <h2>Sort by</h2>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Category</Form.Label>
                <Form.Select aria-label="Default select example"
                             onChange={event => {
                                 console.log(event.target.value)
                                 setSortBy(Number(event.target.value))
                             }}
                             value={sortBy}>
                    {a.map((name, index) => {
                        return <option key={index} value={index}>{name} </option>
                    })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ASC/DESC</Form.Label>
                <Form.Select aria-label="Default select example"
                             onChange={event => {
                                 setAsc(Number(event.target.value))
                             }}
                             value={asc}>
                    {b.map((name, index) => {
                        return <option key={index} value={index}>{name} </option>
                    })
                    }
                </Form.Select>
            </Form.Group>
        </Form>
        <h2>Filter by</h2>

        <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Filter by</Form.Label>
                <Form.Select aria-label="Default select example"
                             onChange={event => {
                                 console.log(event.target.value)
                                 setFilterBy(Number(event.target.value))
                             }}
                             value={filterBy}>
                    {c.map((name, index) => {
                        return <option key={index} value={index}>{name} </option>
                    })
                    }
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Filter</Form.Label>
                <Form.Control type="text" placeholder="Filter" defaultValue={filter}
                              onChange={event => {
                                  setFilter(event.target.value)
                              }
                              }>
                </Form.Control>
            </Form.Group>
        </Form>

        <Container>
            <h1>Choose Products</h1>
            <div className="card-deck">

                <Row xs={1} md={2} className="g-4">
                    {productsShow && productsShow.map(product => {
                        return <ProductCard key={product.id} product={product}/>
                    })}
                </Row>
            </div>
        </Container>
    </RequiredLogin>
}
export default MainPage
