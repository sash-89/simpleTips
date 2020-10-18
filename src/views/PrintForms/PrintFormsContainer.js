import React, {useState} from 'react';
import style from "./PrintFormsComponents/PrintForms.module.css";
import PrintForms from "./PrintFormsComponents/PrintForms";
import Modal from "../../components/Modal/Modal";
import {isFiendInFocusSelector} from "../../modules/windowSizeToggle/windowSizeSelectors";
import {useSelector} from "react-redux";

 const modalText = "We will contact you shortly to clarify the delivery details.";
 const modalTitle = "Order successfully placed";

const PrintFormsContainer = ({}) => {
   const isFiendInFocus = useSelector(state => isFiendInFocusSelector(state))

    const users = ["Sara Connor", "John Johns", "Mike Tyson", "Johny Cage",];
    const [inputValue,  changeValue] = useState("");
    const [isModalOpen,  modalToggle] = useState(false);

    const searchUser =()=>{
        if (!inputValue.trim()) return users;
        return users.filter(user=>{
                return user.toLowerCase().includes(inputValue.toLowerCase().trim())
            }
        )
    };

    return(
        <>
            <Modal modalTitle={modalTitle} modalToggle={isModalOpen} modalText={modalText} valueRightBtn={"Continue"}
                   onClickRightBtn={() => modalToggle(false)} modalClassName={style.modalCls}/>

            <PrintForms searchUser={searchUser()} inputValue={inputValue} changeValue={changeValue}
                        modalToggle={modalToggle} isFiendInFocus={isFiendInFocus}/>

        </>
    )};

export default PrintFormsContainer;
