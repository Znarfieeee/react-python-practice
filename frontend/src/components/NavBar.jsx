import React from "react"
import styles from "../css/navbar.module.css"

function NavBar() {
    return (
        <>
            <div
                id="main-container"
                className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                    <div id="hamburger">
                        <label className={styles.hamburger}>
                            {" "}
                            {/* Use styles.hamburger */}
                            <input type="checkbox" />
                            <svg viewBox="0 0 32 32">
                                <path
                                    className={`${styles.line} ${styles["line-top-bottom"]}`} // Use styles.line and styles["line-top-bottom"]
                                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                                <path
                                    className={styles.line}
                                    d="M7 16 27 16"></path>
                            </svg>
                        </label>
                    </div>
                    <div id="logo">
                        <p className="text-bold text-2xl text-[#86B9C7] flex flex-col justify-center items-center">
                            K E E P S A K E
                            <p className="text-[13px]">smart beginnings</p>
                        </p>
                    </div>
                </div>
                <div id="left-items" className="mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-7 mr-4 cursor-pointer">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                </div>
            </div>
            <hr className="w-[95%] border-[0.2] border-[#c0c0c0] mx-auto" />
        </>
    )
}

export default NavBar
