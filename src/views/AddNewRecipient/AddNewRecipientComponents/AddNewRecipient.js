import React from 'react';
import style from "./AddNewRecipient.module.css";

import {Button} from "../../../components/Button/Button";
import {InputField} from "../../../components/InputField/InputField";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";

const AddNewRecipient = ({}) => {

    return (
        <div className={style.addNewRecipientContainer}>
            <HeaderSecondMB title={"Add Recipient"}/>

            <div className={style.addNewRecipientWrapper}>
                <div className={style.inputFieldWrapper}>
                    <InputField placeholder={"First Name"}/>
                </div>

                <div className={style.inputFieldWrapper}>
                    <InputField placeholder={"Last Name"}/>
                </div>

                <div className={style.inputFieldWrapper}>
                    <InputField placeholder={"Phone"}/>
                </div>

                <div className={style.btnWrapper}>
                    <Button className={style.Btn}>Add Recipients</Button>
                </div>
            </div>
        </div>
    )
};

export default AddNewRecipient;
