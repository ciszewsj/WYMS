import {urlApi} from "../objects/Settings";

export function createPos(fields, setResponse) {
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
                    let resp = {status: 201}
                    resp.id = js.id
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
                    setError({"status": 200})
                }
            )
        } else {
            console.log("ERROR")
            setError({"status": 500})
        }
    })
}

export function updatePos(id, fields, setResponse) {
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
            setResponse({"status": 201})
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

export function deletePos(id, setResponse) {
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

            setResponse({"status": 300})
        } else {
            console.log("ERROR")
            setResponse({"status": 500})
        }
    })
}
