import {Button, Container, Image, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {getCategories} from "./CategoryRequests";

let CategoryListSite = () => {
    const navigate = useNavigate();

    let [categoriesList, setCategoriesList] = useState([])
    let [errorList, setErrorList] = useState([])

    useEffect(() => {
        getCategories(setCategoriesList, setErrorList)
    }, [])
    let CategoriesTable = ({id, name, url}) => {
        return <tr onClick={() => navigate('/categories/' + id)}>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>
                <Image style={{width: 320, height: 240, margin: "auto", textAlign: "center", display: "block"}}
                       src={url}/>
            </td>
        </tr>
    }

    return <Container>
        <h1>Categories</h1>
        <Table responsive={"md"} striped={true} border={1} variant={"light"}>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Image</th>
            </tr>
            </thead>
            <tbody>
            {categoriesList && categoriesList.map(category => <CategoriesTable key={category.id} id={category.id}
                                                                               name={category.name}
                                                                               url={category.image}/>)}
            </tbody>
        </Table>
        <Button variant="primary" type="submit" onClick={(e) => {
            navigate("/categories/new")
        }}>
            Create
        </Button>
    </Container>
}

export default CategoryListSite;
