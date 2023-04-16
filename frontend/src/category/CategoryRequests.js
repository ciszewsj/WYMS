import {urlApi} from "../objects/Settings";

export function getCategories(setResponse, setError) {
    fetch(urlApi + "/category",
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

export function createCategory(fields) {
    fetch(urlApi + "/category",
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
                    pictureUrl: fields.pictureUrl,
                }
            )
        }).then(response => {
        if (response.status === 200) {
            response.json().then(
                js => {
                    console.log(js)
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function updateCategory(id, fields) {
    fetch(urlApi + "/category/" + id,
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
                    pictureUrl: fields.pictureUrl,
                }
            )
        }).then(response => {
        if (response.status === 200) {
            response.json().then(
                js => {
                    console.log(js)
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function getCategory(id, setResponse, setError) {
    fetch(urlApi + "/category/" + id,
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
                    js.pictureUrl = js.image
                    setResponse(js)
                }
            )
        } else {
            console.log("ERROR")
        }
    })
}

export function deleteCategory(id) {
    fetch(urlApi + "/category/" + id,
        {
            "mode": "cors",
            "method": "DELETE",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${getSession().token}`
            }
        }).then(response => {
        if (response.status === 200) {

        } else {
            console.log("ERROR")
        }
    })
}
