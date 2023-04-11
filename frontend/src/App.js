import logo from './logo.svg';
import './App.css';
import PosListSite from "./pos/PosListSite";
import AppNavigation from "./objects/AppNavigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import PosSite from "./pos/PosSite";

function App() {
    return (
        <BrowserRouter>
            {/*<UserContext.Provider value={value}>*/}
            <AppNavigation/>
            <Container className="p-4 m-auto">

                <Routes>
                    <Route path="/" element={<PosListSite/>}/>
                    <Route path="/*" element={<PosSite/>}/>
                    <Route path="/pos/:id" element={<PosSite/>}/>
                </Routes>
            </Container>
            {/*</UserContext.Provider>*/}
        </BrowserRouter>
    );
}

export default App;
