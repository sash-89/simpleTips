import React from 'react';
import style from "./SuccessMessageModal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import {useSelector} from "react-redux";
import {windowSizeSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";

const SuccessMessageModal = ({modalClassName, modalText}) => {
    const windowSizeMobile = useSelector(state => windowSizeSelector(state));

    return(
        <Backdrop styles={windowSizeMobile ? {background: "transparent"} : null} choosingTransactionsIsOpen={modalText} isGrey={true}>

                <div className={[style.modalContainer, modalClassName].join(" ")}>
                    <div className={style.modalText}>
                        {modalText}
                    </div>
                </div>
        </Backdrop>
)};

export default SuccessMessageModal;
