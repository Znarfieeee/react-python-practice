import React from "react"
import { Link } from "react-router-dom"

function Login() {
    fetch("http://localhost:5000/login", {})

    return (
        <>
            <form>
                <h1>Login</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <button type="submit">Login</button>
                <div>
                    <p>
                        Don't have an account?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </form>
        </>
    )
}

export default Login
