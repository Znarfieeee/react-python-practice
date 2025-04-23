import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import NotFound from "./pages/NotFound.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

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
