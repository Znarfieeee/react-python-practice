import axios from "axios"

import BASE_URL from "./backendAPI"

export const register = async formData => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 201) {
            return true
        } else {
            alert("Error in registering user.")
            return false
        }
    } catch (err) {
        console.log("Error in register API", err)
        return null
    }
}

export const login = async formData => {
    try {
        const response = await axios.post(`${BASE_URL}/login`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.status === 200) {
            return response.data
        } else {
            return { msg: "Login Failed", status: "error" }
        }
    } catch (err) {
        console.log(err)
        return { msg: "API error occurred", status: "error" }
    }
}

export const logout = async () => {
    try {
        const response = await axios.post(
            `${BASE_URL}/logout`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        if (response === 200) {
            return response.data.msg
        }
    } catch (err) {
        alert("Error: ", err)
    }
}
