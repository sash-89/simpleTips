export const LOGIN = {
    SMS_CODE_SUCCESSFULLY_SENT: 'LOGIN.SMS_CODE_SUCCESSFULLY_SENT',
    PHONE_NUMBER_IS_CHANGING: 'LOGIN.PHONE_NUMBER_IS_CHANGING',
    SMS_CODE_NOT_SENT: 'LOGIN.SMS_CODE_NOT_SENT',

    PHONE_NUMBER_ERROR_MESSAGE: 'LOGIN.PHONE_NUMBER_ERROR_MESSAGE',
    SMS_CODE_ERROR_MESSAGE: 'LOGIN.SMS_CODE_ERROR_MESSAGE',

    REQUEST_SMS_CODE: 'LOGIN.REQUEST_SMS_CODE',
    LOGIN_REQUEST: 'LOGIN.LOGIN_REQUEST',
};

export const smsCodeSuccessfullySent = (phoneNumber) => ({
    type: LOGIN.SMS_CODE_SUCCESSFULLY_SENT,
    payload: phoneNumber

});

export const phoneNumberIsChanging = () => ({
    type: LOGIN.PHONE_NUMBER_IS_CHANGING,
});

export const smsCodeNotSent = () => ({
    type: LOGIN.SMS_CODE_NOT_SENT,
});

export const setPhoneNumberErrorMessage = (errorMessage) => ({
    type: LOGIN.PHONE_NUMBER_ERROR_MESSAGE,
    payload: errorMessage
});

export const setSmsCodeErrorMessage = (errorMessage) => ({
    type: LOGIN.SMS_CODE_ERROR_MESSAGE,
    payload: errorMessage
});

//sagaActions
export const requestSmsCode = (url) => ({
    type: LOGIN.REQUEST_SMS_CODE,
    payload: url
});


export const login = (code, phoneNumber, roleType) => ({
    type: LOGIN.LOGIN_REQUEST,
    payload: {code, phoneNumber, roleType}
});