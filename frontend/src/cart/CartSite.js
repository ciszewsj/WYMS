import {Button, Container, Image, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "../objects/Settings";
import {addProductToCart, getCart, getCartPrice, payForCart} from "./CartRequests";
import {getCurrentPrice, longToPrice} from "../utils/MoneyUtils";

let CartSite = () => {
    const [settings, setSettings] = useContext(SettingsContext);

    let [cart, setCart] = useState({})
    let [errorList, setErrorList] = useState([])
    let [cartPrice, setCartPrice] = useState(0)
    let [errorListPrice, setErrorListPrice] = useState([])


    let CategoriesTable = ({id, image, name, category, code, price, amount}) => {
        return <tr>
            <th scope="row">
                {image &&
                    <Image style={{width: 320, height: 240, margin: "auto", textAlign: "center", display: "block"}}
                           src={image}/>
                }
            </th>
            <td>{name}</td>
            <td>{category}</td>
            <td>{code}</td>
            <td>{price}</td>
            <td>{amount &&
                <Button variant="danger" type="submit" onClick={(e) => {
                    e.preventDefault()
                    addProductToCart(settings.cartId, {productId: id, amount: -1})
                }}>
                    -
                </Button>}
            </td>
            <td>{amount}</td>
            <td>{amount &&
                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault()
                    addProductToCart(settings.cartId, {productId: id, amount: 1})
                }}>
                    +
                </Button>}
            </td>
        </tr>
    }

    useEffect(() => {
        getCart(settings.cartId, setCart, setErrorList)
    }, [])

    useEffect(() => {
        getCartPrice(settings.cartId, setCartPrice, setErrorListPrice)
    }, [])

    return <Container>
        <h1>Cart: {cart.pos && cart.pos.name}</h1>
        <Table responsive={"md"} striped={true} border={1} variant={"light"}>
            <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Code</th>
                <th>Price</th>
                <th/>
                <th>Amount</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {cart.cartItemList && cart.cartItemList.map(itemList => {
                console.log(itemList)
                return <CategoriesTable key={itemList.id}
                                        id={itemList.product && itemList.product.id}
                                        name={itemList.product && itemList.product.name}
                                        image={itemList.product && itemList.product.image}
                                        code={itemList.product && itemList.product.code}
                                        price={itemList.product && itemList.product.priceList && getCurrentPrice(itemList.product.priceList) + " PLN"}
                                        category={itemList.product && itemList.product.category && itemList.product.category.name}
                                        amount={itemList.value}/>
            })
            }
            <CategoriesTable code={"Total"} price={longToPrice(cartPrice)}/>
            </tbody>
        </Table>
        <Button variant="primary" onClick={e => {
            e.preventDefault()
            payForCart(settings.cartId)
        }}>Pay</Button>
    </Container>
}

export default CartSite;
