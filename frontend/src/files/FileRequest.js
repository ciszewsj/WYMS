import {urlApi} from "../objects/Settings";
import fileDownload from "js-file-download";

export function getProductFiles() {
    fetch(urlApi + "/xml/products",
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            }
        }).then(response => {
        if (response.status === 200) {
            response.json().then(
                js => {
                    fileDownload(new Blob([JSON.stringify(js)], {type: "text/plain"}), 'products.json', 'application/json')
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function getBillFiles(id) {
    fetch(urlApi + "/xml/bill/" + id,
        {
            "mode": "cors",
            "method": "GET",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            }
        }).then(response => {
        if (response.status === 200) {
            response.json().then(
                js => {
                    fileDownload(new Blob([JSON.stringify(js)], {type: "text/plain"}), 'bill.json', 'application/json')
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function postProductFiles(fields, setResponse) {
    fetch(urlApi + "/xml/products",
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            },
            body: fields

        }).then(response => {
        if (response.status === 200) {
            setResponse({message: "SUCCESS"})
        } else {
            setResponse({message: "FAILED"})
        }
    })
}

export function validateFiles(fields, setResponse) {
    fetch(urlApi + "/xml/bill",
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            },
            body: fields

        }).then(response => {
        if (response.status === 200) {
            setResponse({message: "SUCCESS"})
        } else {
            setResponse({message: "FAILED"})
        }
    })
}
