import {Button, Container} from "react-bootstrap";
import {RequiredLogin} from "../objects/AppNavigation";
import {getProductFiles, postProductFiles, validateFiles} from "./FileRequest";
import {useState} from "react";

let FilesSite = () => {
    let [error, setError] = useState({})
    let [error2, setError2] = useState({})

    return <RequiredLogin>
        <Container>
            <h1>Files</h1>
            <Button onClick={event => {
                event.preventDefault()
                getProductFiles()
            }}>Download Products</Button>
            <br/>
            <br/>
            <input type="file" accept="application/json" name="products" id="id_prod"/><br/>
            <Button onClick={event => {
                event.preventDefault()
                let file = document.getElementById("id_prod").files[0];
                if (file) {
                    let reader = new FileReader()
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        let parsed = JSON.parse(evt.target.result)
                        postProductFiles(JSON.stringify(parsed), setError)
                    }
                    reader.onerror = function (evt) {
                        setError({message: "FAILED"})

                    }
                } else {
                    setError({message: "NO_FILE"})

                }
            }}>Update Products</Button>
            {error.message && <h3>{error.message}</h3>}
            <br/>
            <br/>
            <input type="file" accept="application/json" name="products" id="id_bill"/><br/>
            <Button onClick={event => {
                event.preventDefault()
                let file = document.getElementById("id_bill").files[0];
                if (file) {
                    let reader = new FileReader()
                    reader.readAsText(file, "UTF-8");
                    reader.onload = function (evt) {
                        let parsed = JSON.parse(evt.target.result)
                        validateFiles(JSON.stringify(parsed), setError2)
                    }
                    reader.onerror = function (evt) {
                        setError2({message: "FAILED"})

                    }
                } else {
                    setError2({message: "NO_FILE"})

                }
            }}>Update Products</Button>
            {error2.message && <h3>{error2.message}</h3>}

        </Container>
    </RequiredLogin>
}

export default FilesSite;
