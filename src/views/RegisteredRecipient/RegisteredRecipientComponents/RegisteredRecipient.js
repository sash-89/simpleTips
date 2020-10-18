import React from 'react';
import style from "./RegisteredRecipient.module.css";

import {Button} from "../../../components/Button/Button";
import {InputField} from "../../../components/InputField/InputField";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";

const RegisteredRecipient = ({userDataValue, changeUserData, attachOrganizationForUser, errorMessage}) => {

    return (
        <div className={style.registeredRecipientContainer}>
            <HeaderSecondMB title={"Add Recipient"}/>

            <div className={style.registeredRecipientWrapper}>
                <div className={style.inputFieldWrapper}>
                    <InputField placeholder={"Full name, code or phone"}
                    value={userDataValue} onChange={changeUserData}/>
                </div>

                {errorMessage && <div className={style.errorMessage}>{errorMessage}</div>}

                <div className={style.btnWrapper}>
                    <Button onClick={attachOrganizationForUser} className={style.Btn}>Send Invitation</Button>
                </div>
            </div>

            <div style={{left: 50, top: 150}}><b>1599196364009</b> - UserID для теста</div>                           {/*delete*/}
        </div>
    )
};

export default RegisteredRecipient;
