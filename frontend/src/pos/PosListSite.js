import {Container, Table} from "react-bootstrap";
import {useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';

let PosListSite = () => {

    let [posList, setPosList] = useState([])

    let PosTable = ({key, name}) => {
        return <tr>
            <th scope="row">{key}</th>
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
            {posList && posList.map(pos => <PosTable key={pos.id} name={pos}/>)}
            </tbody>
        </Table>
    </Container>;
}

export default PosListSite;
