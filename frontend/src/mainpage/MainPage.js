import {Button, Card, CardGroup, Container, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getProducts} from "../product/ProductRequests";
import {useNavigate} from "react-router-dom";
import {getCurrentPrice} from "../utils/MoneyUtils";
import {addProductToCart} from "../cart/CartRequests";
import {useContext} from "react";
import {SettingsContext} from "../objects/Settings";

let MainPage = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useContext(SettingsContext);

    let [products, setProducts] = useState([])
    let [errorList, setErrorList] = useState([])


    useEffect(() => {
        getProducts(setProducts, setErrorList)
    }, [])

    let ProductCard = ({product}) => {
        return (<Card style={{width: '18rem'}}
                      onClick={e => {
                          e.preventDefault()
                          addProductToCart(settings.cartId, {productId: product.id, amount: 1})
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
    return <Container>
        <h1>Choose Products</h1>
        <div className="card-deck">

            <Row xs={1} md={2} className="g-4">
                {products && products.map(product => {
                    return <ProductCard key={product.id} product={product}/>
                })}
            </Row>
        </div>
    </Container>
}
export default MainPage
