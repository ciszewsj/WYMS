import {Image, Table} from "react-bootstrap";

export function  getCurrentPrice (priceList){
    if (priceList.length > 0) {
        let price = priceList.at(-1)
        price = price.value / 100
        return price.toFixed(2)
    } else {
        return (0.00).toFixed(2)
    }
}

export function ProductTable({productsList, navigate}) {
    let ProductsTable = ({code, name, category, price, deposit, image}) => {
        return <tr onClick={() => navigate('/products/' + code)}>
            <th scope="row">{code}</th>
            <td>{name}</td>
            <td>{category}</td>
            <td>{price}</td>
            <td>{deposit}</td>
            <td>
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
