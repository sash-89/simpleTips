import React from 'react';
import {InputField} from "../../../../components/InputField/InputField";
import style from './ChangePhone.module.css'
import {Button} from "../../../../components/Button/Button";
import {ReSendBtn} from "../../../../components/ReSendBtn/ReSendBtn";
import HeaderSecondMB from "../../../Header/HeaderMobile/HeaderSecondMB";
import {PhoneInputField} from "../../../../components/InputField/PhoneInputField";
import {numbersPattern} from "../../../../utils/validators";

const toggle = false

const ChangePhone = ({role, userPhoneNumberValue, setUserPhoneNumber, isReceivedSmsCode, getUserSmsCode, confirmPhoneNumber,
                         userSmsCodeValue, setUserSmsCode, smsCodeTimer, isReSendButtonDisabled, isButtonDisabled,
                         confirmChangedPhoneNumber, phoneNumberErrorMessage, smsCodeErrorMessage}) => {

    return (
    <div className={style.changePhoneContainer}>

        <HeaderSecondMB headerClassName={style.headerCls} role={role} title={"Change phone"}/>

        <div className={style.contentWrapper}>

            <div className={style.inputWrapper}>
                <PhoneInputField
                    value={userPhoneNumberValue}
                    placeholder={"Phone number"}
                    onChange={setUserPhoneNumber}
                />
            </div>

            {phoneNumberErrorMessage && <p className={style.errorMessage}>{phoneNumberErrorMessage}</p>}

            {isReceivedSmsCode
                ? <div className={style.inputWrapper}>
                    <InputField
                        placeholder={'SMS-code'}
                        type={"tel"}
                        value={userSmsCodeValue}
                        maxLength={6}
                        pattern={numbersPattern}
                        onChange={setUserSmsCode}
                        // ref={smsFieldRef}
                    />

                    {smsCodeErrorMessage && <p className={style.smsCodeErrorMessage}>{smsCodeErrorMessage}</p>}

                    {isReSendButtonDisabled
                        ? <div>
                            <p className={style.resent}> {"New code can be requested through:"} <span
                            > {smsCodeTimer > 0 && smsCodeTimer <= 9 ? `0${smsCodeTimer}` : smsCodeTimer} sec</span></p>
                        </div>

                        : <p className={style.resent}>
                            You can request a new code
                        </p>
                    }

                    <ReSendBtn className={style.reSendBtn} onClick={getUserSmsCode}
                               disabled={isReSendButtonDisabled}>Re-send code</ReSendBtn>

                    <Button className={style.btnConfirm} onClick={confirmChangedPhoneNumber}>Confirm</Button>
                </div>

                : <div>
                    <p className={style.text}>
                        An SMS message with a confirmation code will be sent to the new phone number
                    </p>

                    <Button className={style.btnContinue}
                            onClick={getUserSmsCode}
                            disabled={confirmPhoneNumber === userPhoneNumberValue && phoneNumberErrorMessage || isButtonDisabled}
                    >Continue</Button>
                </div>}

        </div>
    </div>
)};

export default ChangePhone
