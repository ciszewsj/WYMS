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

export function createProduct(fields) {
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
                    amount: fields.amount
                }
            )
        }).then(response => {
        if (response.status === 200) {
            console.log("CREATED")
        } else {
            console.log("ERROR")
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

export function updateProduct(id, fields) {
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
                    amount: fields.amount
                }
            )
        }).then(response => {
        if (response.status === 200) {

        } else {
            response.json().then(js => {
                console.log(js)
            })
            console.log("ERROR")
        }
    })
}

