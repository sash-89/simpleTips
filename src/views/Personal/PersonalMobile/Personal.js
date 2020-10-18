import React from 'react';
import {InputField} from "../../../components/InputField/InputField";
import style from "./Personal.module.css";
import {Button} from "../../../components/Button/Button";
import HeaderSecondMB from "../../Header/HeaderMobile/HeaderSecondMB";
import UserContacts from "../../../components/UserContacts/UserContacts";
import {isIOS} from "../../../utils/validators";


const Personal = ({inputFieldData, saveProfileChanges, userEmail, userPhoneNumber, isFiendInFocus}) => {

    const inputsWrapperCls = [style.inputsWrapper]

    if(isIOS && isFiendInFocus) inputsWrapperCls.push(style.inputsWrapperIphoneInFocus)

    return (
        <div className={style.personalContainer}>
            <div className={"Mobile"}>
                <HeaderSecondMB title={"Personal"}/>
            </div>

            <div className={"Desktop"}>
                <h5 className={style.title}>Personal</h5>
            </div>

            <div className={inputsWrapperCls.join(" ")} >
                {inputFieldData.map(input => {
                    return (
                        <div className={style.inputs} key={input.name}>
                            <InputField placeholder={input.placeholder} onChange={input.onChange}
                                        value={input.value} name={input.name}
                            />

                            {input.isError && <div className={style.error}>Required field</div>}
                        </div>
                    )
                })}

                <UserContacts userEmail={userEmail} userPhoneNumber={userPhoneNumber}/>

                <Button style={{width: 131, marginBottom: 20, zIndex: 10}} onClick={saveProfileChanges}>Save changes</Button>
            </div>

        </div>
    );
};

export default Personal;
