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
