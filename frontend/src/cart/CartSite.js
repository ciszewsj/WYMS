import {Button, Container, Image, Table} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {SettingsContext} from "../objects/Settings";
import {addProductToCart, getCart, getCartPrice, payForCart} from "./CartRequests";
import {getCurrentPrice, longToPrice} from "../utils/MoneyUtils";
import {useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {RequiredLogin} from "../objects/AppNavigation";

let CartSite = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useContext(SettingsContext);

    let [cart, setCart] = useState({})
    let [errorList, setErrorList] = useState([])
    let [cartPrice, setCartPrice] = useState(0)
    let [errorListPrice, setErrorListPrice] = useState([])

    useEffect(() => {
        setCart({})
        getCart(settings.cartId, setCart, setErrorList)
    }, [settings])

    useEffect(() => {
        setCartPrice(0)
        getCartPrice(settings.cartId, setCartPrice, setErrorListPrice)
    }, [settings])

    if (settings.token && settings.cartId == null) {
        console.log("?????")
        return <Navigate to={"/error"}/>;
    }


    let CategoriesTable = ({id, image, name, category, code, price, amount}) => {
        return <tr>
            <th className={"align-middle"} scope="row">
                {image &&
                    <Image style={{width: 320, height: 240, margin: "auto", textAlign: "center", display: "block"}}
                           src={image}/>
                }
            </th>
            <td className={"align-middle"}>{name}</td>
            <td className={"align-middle"}>{category}</td>
            <td className={"align-middle"}>{code}</td>
            <td className={"align-middle"}>{price}</td>
            <td className={"align-middle"}>{amount &&
                <Button variant="danger" type="submit" onClick={(e) => {
                    e.preventDefault()
                    addProductToCart(settings.cartId, {productId: id, amount: -1})
                }}>
                    -
                </Button>}
            </td>
            <td className={"align-middle"}>{amount}</td>
            <td className={"align-middle"}>{amount &&
                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault()
                    addProductToCart(settings.cartId, {productId: id, amount: 1})
                }}>
                    +
                </Button>}
            </td>
        </tr>
    }


    return <RequiredLogin>
        <Container>
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
    </RequiredLogin>
}

export default CartSite;
