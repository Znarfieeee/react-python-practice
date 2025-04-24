import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

import { register } from "../api/index"

const Register = () => {
    const nameRef = useRef()
    const emailRef = useRef()
    const hobbyRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            if (
                passwordRef.current.value === confirmPasswordRef.current.value
            ) {
                const formData = {
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    hobby: hobbyRef.current.value,
                    password: passwordRef.current.value,
                }
                await register(formData)
                navigate("/")
            } else {
                alert("Passwords do not match!")
            }
        } catch (err) {
            alert(err.response?.data?.msg || "Error registering user!")
            console.error(err)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        ref={nameRef}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        ref={emailRef}
                    />
                </div>
                <div>
                    <label htmlFor="hobby">Hobby</label>
                    <input
                        type="hobby"
                        id="hobby"
                        name="hobby"
                        required
                        ref={hobbyRef}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        ref={passwordRef}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassowrd">Confirm Passowrd</label>
                    <input
                        type="password"
                        id="confirmPassowrd"
                        name="confirmPassowrd"
                        required
                        ref={confirmPasswordRef}
                    />
                </div>
                <button type="submit">Register</button>
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
