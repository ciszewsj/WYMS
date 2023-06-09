import {Image, Table} from "react-bootstrap";
import {getCurrentPrice} from "../utils/MoneyUtils";


export function ProductTable({productsList, navigate}) {
    let ProductsTable = ({code, name, category, price, deposit, image}) => {
        return <tr onClick={() => navigate('/products/' + code)}>
            <th className={"align-middle"} scope="row">{code}</th>
            <td className={"align-middle"}>{name}</td>
            <td className={"align-middle"}>{category}</td>
            <td className={"align-middle"}>{price}</td>
            <td className={"align-middle"}>{deposit}</td>
            <td className={"align-middle"}>
                <Image style={{width: 320, height: 240, margin: "auto", textAlign: "center", display: "block"}}
                       src={image}/>
            </td>
        </tr>
    }

    let depositsProductNumber = (deposits) => {
        let number = 0
        deposits.forEach(deposit => {
            number += deposit.value
        })
        return number
    }


    return <Table responsive={"md"} striped={true} border={1} variant={"light"}>
        <thead>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Deposit</th>
            <th>Image</th>
        </tr>
        </thead>
        <tbody>
        {productsList && productsList.map(product =>
            <ProductsTable key={product.id}
                           code={product.code}
                           name={product.name}
                           category={product.category ? product.category.name : ""}
                           price={getCurrentPrice(product.priceList) + " PLN"}
                           deposit={depositsProductNumber(product.depositList)}
                           image={product.image}/>)}

        </tbody>
    </Table>
}
