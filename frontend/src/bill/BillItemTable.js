import {getCurrentPrice, longToPrice} from "../utils/MoneyUtils";
import {Button, Image, Table} from "react-bootstrap";
import {addProductToCart} from "../cart/CartRequests";


export function BillItemTable({products, navigate}) {

    let Element = ({id, image, name, category, code, price, amount}) => {
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
            <td>{amount}</td>
        </tr>
    }


    return <Table responsive={"md"} striped={true} border={1} variant={"light"}>
        <thead>
        <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Code</th>
            <th>Price</th>
            <th>Amount</th>
        </tr>
        </thead>
        <tbody>
        {products && products.map(itemList => {
            console.log(itemList)
            return <Element key={itemList.id}
                            id={itemList.product && itemList.product.id}
                            name={itemList.product && itemList.product.name}
                            image={itemList.product && itemList.product.image}
                            code={itemList.product && itemList.product.code}
                            price={itemList.product && itemList.product.priceList && getCurrentPrice(itemList.product.priceList) + " PLN"}
                            category={itemList.product && itemList.product.category && itemList.product.category.name}
                            amount={itemList.value}/>
        })
        }
        <Element/>
        </tbody>
    </Table>
}
