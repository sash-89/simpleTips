import {LOGIN} from "./loginActions";

let initialState = {
    phoneNumber: null,
    isReceivedSmsCode: false,
    phoneNumberErrorMessage: null,
    smsCodeErrorMessage: null,

    // smsCode: null,   <==

};

const loginReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case LOGIN.SMS_CODE_SUCCESSFULLY_SENT:
            return {
                ...state,
                phoneNumber: payload,
                isReceivedSmsCode: true
            };
        case LOGIN.PHONE_NUMBER_IS_CHANGING:
            return {
                ...state,
                isReceivedSmsCode: false
            };
        case LOGIN.SMS_CODE_NOT_SENT:
            return {
                ...state,
                isReceivedSmsCode: false,
                phoneNumberErrorMessage: "User is blocked",
            };
        case LOGIN.PHONE_NUMBER_ERROR_MESSAGE:
            return {
                ...state,
                phoneNumberErrorMessage: payload,
            };
        case LOGIN.SMS_CODE_ERROR_MESSAGE:
            return {
                ...state,
                smsCodeErrorMessage: payload,
            };

        default:
            return state
    }

};


export default loginReducer;