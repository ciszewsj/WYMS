import {urlApi} from "../objects/Settings";

export function getProducts(setResponse, setError) {
    fetch(urlApi + "/product",
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

export function getProduct(id, setResponse, setError) {
    fetch(urlApi + "/product/" + id,
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
                    if (js.category) {
                        js.categoryId = js.category.id
                    }
                    console.log(js)
                    console.log("????")
                    setResponse(js)
                }
            )
        } else {
            console.log("ERROR")
        }
    })

}

export function getProductsByCategory(categoryId, setResponse, setError) {
    fetch(urlApi + "/product/category/" + categoryId,
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

export function createProduct(fields, setResponse) {
    fetch(urlApi + "/product",
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
                    name: fields.name,
                    image: fields.image,
                    price: fields.price,
                    categoryId: fields.categoryId,
                    amount: fields.amount,
                    code: fields.code
                }
            )
        }).then(response => {
        if (response.status === 200) {
            response.json().then(
                js => {
                    console.log(js)
                    let resp = {status: 201}
                    resp.code = js.code
                    setResponse(resp)
                }
            )
        } else if (response.status === 400) {
            response.json().then(
                js => {
                    let resp = {status: 400}
                    js.forEach(error => {
                        resp[error.field] = error.defaultMessage
                    })
                    setResponse(resp)
                }
            )
        }
    })

}

export function correctDeposit(id, fields) {
    fetch(urlApi + "/product/deposit/" + id,
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
                    description: fields.description,
                    value: fields.value
                }
            )
        }).then(response => {
        if (response.status === 200) {

        } else {
            console.log("ERROR")
        }
    })
}

export function updateProduct(id, fields, setResponse) {
    fetch(urlApi + "/product/" + id,
        {
            "mode": "cors",
            "method": "PUT",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            },
            "body": JSON.stringify(
                {
                    name: fields.name,
                    image: fields.image,
                    price: fields.price,
                    categoryId: fields.categoryId,
                    amount: fields.amount,
                    code: fields.code
                }
            )
        }).then(response => {
        if (response.status === 200) {

            let resp = {status: 201}
            setResponse(resp)

        } else {
            response.json().then(
                js => {
                    let resp = {status: 400}
                    js.forEach(error => {
                        resp[error.field] = error.defaultMessage
                    })
                    setResponse(resp)
                }
            )
        }
    })
}

