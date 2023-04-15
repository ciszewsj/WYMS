import {Button, Container, Table} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {getPoses} from "./PosRequests";

let PosListSite = () => {
    const navigate = useNavigate();

    let [posList, setPosList] = useState([])
    let [errorList, setErrorList] = useState([])

    useEffect(() => {
        getPoses(setPosList, setErrorList)
    }, [])

    let PosTable = ({id, name}) => {
        return <tr onClick={() => navigate('/pos/' + id)}>
            <th scope="row">{id}</th>
            <td>{name}</td>
        </tr>
    }
    return <Container>
        <h1>Points Of Sale</h1>
        <Table responsive={"md"} striped={true} border={1} variant={"light"}>
            <thead>
            <tr>
                <th>Id</th>
                <th>Name</th>
            </tr>
            </thead>
            <tbody>
            {posList && posList.map(pos => <PosTable key={pos.id} id={pos.id} name={pos.name}/>)}
            </tbody>
        </Table>
        <Button variant="primary" type="submit" onClick={(e) => {
            navigate("/pos/new")
        }}>
            Create
        </Button>
    </Container>;
}

export default PosListSite;
