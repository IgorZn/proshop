import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./screens/ErrorScreen.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import ProductScreen from "./screens/ProductScreen.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <HomeScreen />,
            },
            {
                path: "/product/:productId",
                element: <ProductScreen />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
