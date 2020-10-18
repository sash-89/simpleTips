import React, {useState} from 'react';
import style from "./Backdrop.module.css";

const Backdrop = ({choosingTransactionsIsOpen, onClick, children, isGrey, styles}) => {
       const greyBG = isGrey ? style.greyBG : null

       return     <div style={styles} onClick={onClick} className={choosingTransactionsIsOpen ? [style.Backdrop, greyBG].join(" "): style.BackdropOff}>
              {children}
       </div>
};

export default Backdrop;