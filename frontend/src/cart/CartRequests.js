import {urlApi} from "../objects/Settings";

export function addProductToCart(cartId, fields) {
    fetch(urlApi + "/cart/" + cartId,
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            },
            "body": JSON.stringify(
                fields
            )
        }).then(response => {
        if (response.status === 200) {
            console.log("ADDED")
        } else {
            console.log("ERROR")
        }
    })
}

export function payForCart(cartId) {
    fetch(urlApi + "/cart/" + cartId + "/pay",
        {
            "mode": "cors",
            "method": "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            }
        }).then(response => {
        if (response.status === 200) {
            console.log("PAID")
        } else {
            console.log("ERROR")
        }
    })
}

export function getCart(cartId, setResponse, setErrors) {
    fetch(urlApi + "/cart/" + cartId,
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

export function getCartPrice(cartId, setResponse, setErrors) {
    fetch(urlApi + "/cart/" + cartId + "/price",
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
            response.text().then(txt => {
                setResponse(Number(txt))
            })
        } else {
            console.log("ERROR")
        }
    })
}


