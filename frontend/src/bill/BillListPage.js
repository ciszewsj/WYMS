import {Container, Image, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getBills} from "./BillRequests";
import {timeToStr} from "../utils/TimeUtils";
import {useNavigate} from "react-router-dom";

let BillListPage = () => {
    const navigate = useNavigate();

    let [bills, setBills] = useState([])
    let [errors, setErrors] = useState([])

    let BillTable = ({id, date, cashierId, numberOfBought, numberOfReturns}) => {
        return <tr onClick={e => {
            e.preventDefault()
            navigate("/bills/" + id)
        }}>
            <th className={"align-middle"} scope="row">{id}</th>
            <td className={"align-middle"}>{date}</td>
            <td className={"align-middle"}>{cashierId}</td>
            <td className={"align-middle"}>{numberOfBought}</td>
            <td className={"align-middle"}>{numberOfReturns}</td>
        </tr>
    }

    useEffect(() => {
        getBills(setBills, setErrors)
    }, [])


    return <Container>
        <h1>Bills</h1>
        <Table responsive={"md"} striped={true} border={1} variant={"light"}>
            <thead>
            <tr>
                <th>Id</th>
                <th>Date</th>
                <th>CashierId</th>
                <th>Bought</th>
                <th>Returned</th>
            </tr>
            </thead>
            <tbody>
            {bills.map(bill => {
                console.log(bill)
                return <BillTable key={bill.id}
                                  id={bill.id}
                                  date={timeToStr(bill.date)}
                                  numberOfBought={bill.numberOfBought}
                                  numberOfReturns={bill.numberOfReturns}
                                  cashierId={bill.cashierId}/>
            })}
            </tbody>
        </Table>
    </Container>
}
export default BillListPage;
