import {urlApi} from "../objects/Settings";

export function createPos(fields) {
    fetch(urlApi + "/pos",
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
                    name: fields.name
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

export function getPoses(setResponse, setError) {
    fetch(urlApi + "/pos",
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

export function getPos(id, setResponse, setError) {
    fetch(urlApi + "/pos/" + id,
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

export function updatePos(id, fields) {
    fetch(urlApi + "/pos/" + id,
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
                    name: fields.name
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

export function deletePos(id) {
    fetch(urlApi + "/pos/" + id,
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
