import React, {forwardRef, useEffect, useRef} from 'react';
import {Button} from "../../../components/Button/Button";
import style from "./Login.module.css"
import LoginBg from '../../../assets/images/login/bg-mobile.png'
import {InputField} from "../../../components/InputField/InputField";
import {PhoneInputField} from "../../../components/InputField/PhoneInputField";
import {ReSendBtn} from "../../../components/ReSendBtn/ReSendBtn";

const RefInput = forwardRef((props, ref) => (
    <InputField {...props} fieldRef={ref} />
));

const Login = ({confirmPhoneNumber, phoneNumberErrorMessage, smsCodeErrorMessage, isReceivedSmsCode, userPhoneNumberValue,
                   userSmsCodeValue, getUserSmsCode, setUserPhoneNumber, isButtonDisabled, setUserSmsCode, smsCodeTimer,
                   isReSendButtonDisabled, windowSizeMobile, emptyState}) =>{

    const fieldRef = useRef(null);

    useEffect(() => {
        emptyState()
    }, []);

    // useEffect(() => {
    //     if(isReceivedSmsCode && fieldRef.current) setTimeout(()=>fieldRef.current.focus())
    // }, [isReceivedSmsCode]);

  return (
      <div className={style.loginContainer}>

        <div className={style.loginWrapper}>
          <div className={style.numberTitle}>Enter your phone to enter</div>

          <div className={style.phoneInputField}>
            <PhoneInputField
                value={userPhoneNumberValue}
                placeholder={"Phone number"}
                onChange={setUserPhoneNumber}
                emptyValue={true}
            />
          </div>

          {phoneNumberErrorMessage && <p className={style.errorMessage}>{phoneNumberErrorMessage}</p>}

          <div style={{display: "flex", justifyContent: "center", marginTop: "12px"}}>
            {!isReceivedSmsCode
                ? <Button
                    className={style.loginBtn}
                    type="submit"
                    onClick={getUserSmsCode}
                    disabled={confirmPhoneNumber === userPhoneNumberValue && phoneNumberErrorMessage || isButtonDisabled}
                >Continue</Button>

                : <div className={style.passWrap}>
                  <RefInput
                      type={"tel"}
                      value={userSmsCodeValue}
                      maxLength={6}
                      pattern="^-?[0-9]\d*\.?\d*$"
                      onChange={setUserSmsCode}
                      placeholder={"SMS-code"}
                      ref={fieldRef}
                  />

                    {smsCodeErrorMessage && <p className={style.smsCodeErrorMessage}>{smsCodeErrorMessage}</p>}

                  <div style={smsCodeErrorMessage && !windowSizeMobile ? {top: 80} : null} className={style.newCodeWrapper}>
                    {isReSendButtonDisabled
                        ? <div>
                          <p className={style.newCode}> {"New code can be requested through:"} <span
                          > {smsCodeTimer > 0 && smsCodeTimer <= 9 ? `0${smsCodeTimer}` : smsCodeTimer} sec</span></p>
                        </div>

                        : <p className={style.newCode}>
                          You can request a new code
                        </p>
                    }
                  </div>

                  <ReSendBtn className={style.reSendBtn} onClick={getUserSmsCode}
                             disabled={isReSendButtonDisabled}
                  />
                </div>
            }
          </div>
        </div>


        <div className={style.loginBg}>
          <img src={LoginBg} alt={"LoginBg"}/>
        </div>
      </div>

  );
};

export default Login
