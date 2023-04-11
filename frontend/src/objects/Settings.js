import {createContext} from "react";

let Settings = () => {
    return {
        token: ""
    }
}

export const urlApi = "http://localhost:8080";

export const SettingsContext = createContext({});
export default Settings;
