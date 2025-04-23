import React, { useState } from "react"
import { Link } from "react-router-dom"

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleSubmit = async event => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                const result = await response.json()
                console.log("Registration successful:", result)
            } else {
                console.error("Registration failed")
            }
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <div>
            <form>
                <h1>Register</h1>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="hobby">Hobby</label>
                    <input type="hobby" id="hobby" name="hobby" required />
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
                <div>
                    <label htmlFor="confirmPassowrd">Confirm Passowrd</label>
                    <input
                        type="password"
                        id="confirmPassowrd"
                        name="confirmPassowrd"
                        required
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>
                    Register
                </button>
                <div>
                    <p>
                        Already have an account? <Link to="/">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Register
