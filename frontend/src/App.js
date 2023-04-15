import logo from './logo.svg';
import PosListSite from "./pos/PosListSite";
import AppNavigation from "./objects/AppNavigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import PosSite from "./pos/PosSite";
import CategoryListSite from "./category/CategoryListSite";
import './App.css';
import CategorySite from "./category/CategorySite";
import ProductListSite from "./product/ProductListSite";
import ProductSite from "./product/ProductSite";

function App() {
    return (
        <BrowserRouter>
            {/*<UserContext.Provider value={value}>*/}
            <AppNavigation/>
            <Container className="p-4 m-auto">
                <Routes>
                    <Route path="/" element={<PosListSite/>}/>
                    <Route path="/*" element={<PosSite/>}/>
                    <Route path="/pos" element={<PosListSite/>}/>
                    <Route path="/pos/:id" element={<PosSite/>}/>
                    <Route path="/pos/new" element={<PosSite/>}/>
                    <Route path="/categories" element={<CategoryListSite/>}/>
                    <Route path="/categories/:id" element={<CategorySite/>}/>
                    <Route path="/products" element={<ProductListSite/>}/>
                    <Route path="/products/:id" element={<ProductSite/>}/>
                    <Route path="/products/new" element={<ProductSite/>}/>
                </Routes>
            </Container>
            {/*</UserContext.Provider>*/}
        </BrowserRouter>
    );
}

export default App;
