import React from "react";
import styles from "./Button.module.css"


export const Button = ({className, onClick, props, children, disabled, style = {}, type}) => {

    const btnCls = [styles.Btn, className];

    return (
        <button
            className={btnCls.join(" ")}
            onClick={onClick}
            type={type}
            disabled={disabled}
            style={style}
            {...props}
        >
            {children}
        </button>
    )
}
