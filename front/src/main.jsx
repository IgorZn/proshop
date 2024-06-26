import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Cookies
import {CookiesProvider} from "react-cookie";

// Routing
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./screens/ErrorScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";

// Redux
import {Provider} from "react-redux";
import store from "../store.js";

import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import EditProductScreen from "./screens/admin/EditProductScreen.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomeScreen/>,
            },
            {
                path: "/product/:productId",
                element: <ProductScreen/>,
            },
            {
                path: "/cart",
                element: <CartScreen/>,
            },
            {
                path: "/login",
                element: <LoginScreen/>,
            },
            {
                path: "/register",
                element: <RegisterScreen/>,
            },
            {
                path: "/shipping",
                element: <ShippingScreen/>,
            },
            {
                path: "/payment",
                element: <PaymentScreen/>,
            },
            {
                path: "/placeorder",
                element: <PlaceOrderScreen/>,
            },
            {
                path: "/order/:id",
                element: <OrderScreen/>,
            },
            {
                path: "/profile",
                element: <ProfileScreen/>,
            },
            {
                path: "/admin/orderlist",
                element: <OrderListScreen/>,
            },
            {
                path: "/admin/productlist",
                element: <ProductListScreen/>,
            },
            {
                path: "/admin/product/:id/edit",
                element: <EditProductScreen/>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <CookiesProvider>
                <RouterProvider router={router}/>
            </CookiesProvider>
        </Provider>
    </React.StrictMode>,
)
