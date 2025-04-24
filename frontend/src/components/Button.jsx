import React from "react"

function Button(props) {
    return (
        <button
            className="p-2 text-center bg-[#0082A6] text-[#f5f5f5] rounded-md my-6 items-center cursor-pointer"
            style={{ width: props.width }}>
            {props.label}
        </button>
    )
}

export default Button
