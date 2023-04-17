import {createContext} from "react";

export const MockedUser = () => {
    return {
        password: "123",
        login: "user",
        id: "2a5c6a47-a85a-4e11-b5b8-82795b172f15"
    }
}

export const Settings = () => {
    return {
        cartId: null,
        token: null,
        userName: null
    }
}

export const urlApi = "http://localhost:8080";

export const SettingsContext = createContext({});
export default Settings;
