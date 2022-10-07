import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from './components/Cart';
import ProductsGrid from './components/ProductsGrid';
import DisplayMaxProductInfo from './components/DisplayMaxProductInfo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path = "/" element = {<App />}>
                <Route index element = {<ProductsGrid />} />
                <Route path = "cart" element = {<Cart />} />
                <Route path = ":productId" element = {<DisplayMaxProductInfo />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
