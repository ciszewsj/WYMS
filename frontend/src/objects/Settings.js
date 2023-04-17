import {createContext} from "react";

export const Settings = () => {
    return {
        token: "",
        cartId: 1
    }
}

export const urlApi = "http://localhost:8080";

export const SettingsContext = createContext({});
export default Settings;
