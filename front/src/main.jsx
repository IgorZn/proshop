import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Routing
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./screens/ErrorScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";
import CartScreen from "./screens/CartScreen.jsx";

// Redux
import {Provider} from "react-redux";
import store from "../store.js";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";

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
