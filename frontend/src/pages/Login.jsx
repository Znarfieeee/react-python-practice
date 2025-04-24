import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../api/index"
import { showToast } from "../util/alertHelper"
import Button from "../components/Button"

function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()

    const handleSubmit = async e => {
        e.preventDefault()

        try {
            const formData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
            }
            const data = await login(formData)
            showToast("success", data.msg)
            navigate("dashboard")
        } catch (err) {
            alert("Api Error", err)
        }
    }

    return (
        <>
            <div
                className="flex items-center justify-center min-h-screen "
                style={{
                    background:
                        "linear-gradient(27deg, #C4DEE3 50%, #f5f5f5 50%)",
                }}>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-120 ">
                    <h1 className="text-center font-semibold text-2xl mb-6">
                        Login
                    </h1>
                    <hr className="bg-[#5b5b5b] w-full" />
                    <div className="flex flex-col gap-2 w-full mt-8">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            ref={emailRef}
                            className="input p-4 h-10 outline-1 outline-[#D9D9D9] rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col gap-2 w-full mt-4">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            ref={passwordRef}
                            className="input p-4 h-10 outline-1 outline-[#D9D9D9] rounded-lg"
                        />
                    </div>
                    <Button label="Login" width="200px" />
                    <div>
                        <p className="tex-sm text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="relative text-[#3f3f3f] hover:delay-80 ease-in-out hover:transition after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#3f3f3f] hover:after:w-full after:transition-all after:duration-300">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
