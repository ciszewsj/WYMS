import {urlApi} from "../objects/Settings";

export function getBills(setResponse, setError) {
    fetch(urlApi + "/bill",
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
                    console.log("123", js)
                    for (let index in js) {
                        console.log(js[index].cartItemList.map(item => item.value))
                        js[index].numberOfBought = js[index].cartItemList && js[index].cartItemList.length > 0 ? js[index].cartItemList.map(item => item.value).reduce((prev, next) => prev + next) : 0;
                        js[index].numberOfReturns = js[index].returnsItemList && js[index].returnsItemList.length > 0 ? js[index].returnsItemList.map(item => item.value).reduce((prev, next) => prev + next) : 0;

                    }
                    setResponse(js)
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function getBill(id, setResponse, setError) {
    fetch(urlApi + "/bill/" + id,
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
                    setResponse(js)
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function makeReturn(id, fields, setResponse) {
    fetch(urlApi + "/bill/" + id,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            },
            "body": JSON.stringify(
                {
                    returnProductRequests: [
                        {
                            productId: fields.productId,
                            amount: fields.amount
                        }
                    ]
                }
            )
        }).then(response => {
        if (response.status === 200) {
            console.log("Returned")

        } else {
            console.log("ERROR")
        }
        setResponse({})
    })
}
