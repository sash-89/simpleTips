import React from 'react';
import style from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import {ReSendBtn} from "../../components/ReSendBtn/ReSendBtn";

const Modal = ({modalClassName, modalTitle, modalText, modalToggle, onClickLeftBtn, valueLeftBtn, onClickRightBtn, valueRightBtn}) => {

    return(

        <Backdrop choosingTransactionsIsOpen={modalToggle}>
            <div className={style.modalContainer}>

                <div className={[style.modal, modalClassName].join(" ")}>
                    <div className={style.title}>
                        {modalTitle}
                    </div>
                    <div className={style.modalText}>
                        {modalText}
                    </div>
                    <div className={style.buttons}>
                        {valueLeftBtn && <ReSendBtn value={valueLeftBtn} onClick={onClickLeftBtn}/>}
                        <ReSendBtn value={valueRightBtn} className={style.leftBtn} onClick={onClickRightBtn}/>
                    </div>
                </div>
            </div>
        </Backdrop>

)};

export default Modal;
