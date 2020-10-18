import React from 'react';
import style from "./ReSendBtn.module.css"


export const ReSendBtn = ({value, onClick, className, type, disabled}) => {
const btnCls = [style.reSendBtn, className]

  return (
       <button className={btnCls.join(" ")}
       onClick={onClick} type={type} disabled={disabled}
       >
           {value ? value : "Re-send code" }
       </button>
  )
}
