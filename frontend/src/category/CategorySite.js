import {Button, Container, Form, Image} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {createCategory, deleteCategory, getCategory, updateCategory} from "./CategoryRequests";
import {getProductsByCategory} from "../product/ProductRequests";
import {ProductTable} from "../product/ProductTableUtils";
import {RequiredLogin} from "../objects/AppNavigation";

let CategorySite = () => {
    const navigate = useNavigate();

    let [category, setCategory] = useState({})
    let [productsList, setProductsList] = useState([])
    let [errorList, setErrorList] = useState([])
    let [productErrorList, setProductErrorList] = useState([])
    let {id} = useParams();

    let ProductsTable = ({code, name, category, price, deposit, image}) => {
        return <tr onClick={() => navigate('/pos/' + code)}>
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

    useEffect(() => {
        if (id != null) {
            getCategory(id, setCategory, setErrorList)
        }
    }, [])

    useEffect(() => {
        if (category !== {} && category.id != null) {
            getProductsByCategory(category.id, setProductsList, setProductErrorList)
            console.log(productsList)
        }
    }, [category])

    return <RequiredLogin>
        <Container>
            <h1>Category {category.name}</h1>
            {id && <>
                <Container style={{margin: "auto", textAlign: "center"}}>
                    <Image style={{width: 480, height: 360}} src={category.image}/>
                </Container>

                <h2>Products</h2>
                <ProductTable productsList={productsList} navigate={navigate}/>
            </>}

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" placeholder="Id not available" defaultValue={category.id}
                                  readOnly={true}/>
                    <Form.Text className="text-muted">
                        Value is not editable.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Category name" defaultValue={category.name}
                                  onChange={event => {
                                      category.name = event.target.value
                                      setCategory({...category})
                                      console.log(category)
                                  }
                                  }/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control type="text" placeholder="Image URL" defaultValue={category.image} onChange={event => {
                        category.pictureUrl = event.target.value
                        setCategory({...category})
                        console.log(category)
                    }
                    }/>
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => {
                    e.preventDefault();
                    if (id != null) {
                        updateCategory(id, category)
                    } else {
                        createCategory(category);
                    }
                }}>
                    Update
                </Button>
                {id &&
                    <Button variant="danger" type="submit" onClick={(e) => {
                        deleteCategory(id)
                    }}>
                        Delete
                    </Button>
                }
            </Form>
        </Container>
    </RequiredLogin>
}

export default CategorySite;
