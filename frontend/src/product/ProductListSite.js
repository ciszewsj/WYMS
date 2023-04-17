import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProducts} from "./ProductRequests";
import {ProductTable} from "./ProductTableUtils";

let ProductListSite = () => {
    const navigate = useNavigate();

    let [productsList, setProductsList] = useState([])
    let [errorList, setErrorList] = useState([])

    useEffect(() => {
        getProducts(setProductsList, setErrorList)
    }, [])


    return <Container>
        <h1>Products</h1>
        <ProductTable productsList={productsList} navigate={navigate}/>
        <Button variant="primary" type="submit" onClick={(e) => {
            navigate("/products/new")
        }}>
            Create
        </Button>
    </Container>
}

export default ProductListSite;
