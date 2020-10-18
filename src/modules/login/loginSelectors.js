import { createSelector } from 'reselect';


const phoneNumberData = state => state.loginReducer.phoneNumber;
const isReceivedSmsCodeData = state => state.loginReducer.isReceivedSmsCode;
const phoneNumberErrorMessageData = state => state.loginReducer.phoneNumberErrorMessage;
const smsCodeErrorMessageData = state => state.loginReducer.smsCodeErrorMessage;

export const confirmPhoneNumberSelector = createSelector(phoneNumberData, data => data);
export const isReceivedSmsCodeSelector = createSelector(isReceivedSmsCodeData, data => data);
export const phoneNumberErrorMessageSelector = createSelector(phoneNumberErrorMessageData, data => data);
export const smsCodeErrorMessageSelector = createSelector(smsCodeErrorMessageData, data => data);