import React, { useContext, createContext, useState, useEffect } from "react"
import axios from "axios"
// import backendConnection from "../api/backendAPI"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(sessionStorage.getItem("Token") || null)
    const [userData, setUserData] = useState(
        JSON.parse(sessionStorage.getItem("Data") || null)
    )

    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            config => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config
            },
            error => {
                Promise.reject(error)
            }
        )

        return () => {
            axios.interceptors.request.eject(interceptor)
        }
    }, [token])

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("Token", token)
        } else {
            sessionStorage.removeItem("Token")
        }

        if (userData) {
            sessionStorage.setItem("Data", JSON.stringify(userData))
        } else {
            sessionStorage.removeItem("Data")
        }

        return () => {}
    }, [token, userData])

    const login = (authData, userInfo) => {
        setToken(authData)
        setUserData(userInfo)
    }

    // clear authentication data
    setToken(null)
    setUserData(null)
    sessionStorage.removeItem("Token")
    sessionStorage.removeItem("Data")

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
