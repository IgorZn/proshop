import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

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
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>,
)
