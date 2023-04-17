import PosListSite from "./pos/PosListSite";
import AppNavigation from "./objects/AppNavigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import PosSite from "./pos/PosSite";
import CategoryListSite from "./category/CategoryListSite";
import CategorySite from "./category/CategorySite";
import ProductListSite from "./product/ProductListSite";
import ProductSite from "./product/ProductSite";
import MainPage from "./mainpage/MainPage";
import CartSite from "./cart/CartSite";
import Settings, {SettingsContext} from "./objects/Settings";
import {useState} from "react";
import BillListPage from "./bill/BillListPage";
import BillSite from "./bill/BillSite";
import LoginSite from "./login/LoginSite";
import ErrorSite from "./objects/ErrorSite";

function App() {
    let [settings, setSettings] = useState(Settings());
    return (
        <BrowserRouter>
            <SettingsContext.Provider value={[settings, setSettings]}>
                <AppNavigation/>
                <Container className="p-4 m-auto">
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/login" element={<LoginSite/>}/>
                        <Route path="/pos" element={<PosListSite/>}/>
                        <Route path="/pos/:id" element={<PosSite/>}/>
                        <Route path="/pos/new" element={<PosSite/>}/>
                        <Route path="/categories" element={<CategoryListSite/>}/>
                        <Route path="/categories/:id" element={<CategorySite/>}/>
                        <Route path="/categories/new" element={<CategorySite/>}/>
                        <Route path="/products" element={<ProductListSite/>}/>
                        <Route path="/products/:id" element={<ProductSite/>}/>
                        <Route path="/products/new" element={<ProductSite/>}/>
                        <Route path="/cart" element={<CartSite/>}/>
                        <Route path="/bills" element={<BillListPage/>}/>
                        <Route path="/bills/:id" element={<BillSite/>}/>
                        <Route path="/*" element={<ErrorSite/>}/>
                    </Routes>
                </Container>
            </SettingsContext.Provider>
        </BrowserRouter>
    );
}

export default App;
