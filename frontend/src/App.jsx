import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFound from "./pages/NotFound.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/dashboard",
            element: <Home />,
        },
        {
            path: "*",
            element: <NotFound />,
        },
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
