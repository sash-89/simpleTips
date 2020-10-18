import {put, takeLatest, call} from "@redux-saga/core/effects";
import {LoginAPI} from "../../root/api";
import {phoneNumberIsChanging, setSmsCodeErrorMessage, smsCodeNotSent, smsCodeSuccessfullySent} from "./loginActions";
import {loginSuccess} from "../auth/authActions";
import {setUserCurrentOrganization, setUserData} from "../userProfile/userProfileActions";
import {requestToGetAdminOrganization} from "../organization/organizationActions";
import {toggleFieldInFocus} from "../windowSizeToggle/windowSizeAction";


export function* requestSmsCodeWatcher (){
    yield takeLatest("LOGIN.REQUEST_SMS_CODE", requestSmsCodeWorker)

}
function* requestSmsCodeWorker (action){
    try {
        const sentSmsStatus = yield call(LoginAPI.getSmsCode, action.payload);
        if(sentSmsStatus.errorCode === "SMS_SENT") yield put(smsCodeSuccessfullySent(action.payload));

    } catch ({errorCode, resendSmsLimit}) {
        if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}


export function* loginWatcher (){
    yield takeLatest("LOGIN.LOGIN_REQUEST", loginWorker)

}
function* loginWorker (action){
    try {
        const loginData = yield call(LoginAPI.login, action.payload);
        // if(loginData.errorCode === "PHONE_NUMBER_IS_EMPTY") {
        localStorage.setItem('STAuthToken', loginData.token);
            yield put(loginSuccess(loginData.token));
            yield put(setUserCurrentOrganization(loginData.user.organizations[0]));    //??
            yield put(setUserData(loginData.user));
            yield put(toggleFieldInFocus(false));                              //
            yield put(phoneNumberIsChanging());                                       //for change isReceivedSmsCode to false
        // }

    }  catch ({errorCode, resendSmsLimit}) {
        if(errorCode === "INVALID_SMS_CODE") yield put(setSmsCodeErrorMessage("Invalid sms code"))
        else if(errorCode === "SMS_CODE_EXPIRED") yield put(setSmsCodeErrorMessage("Sms code expired"))
        // console.log(errorCode, resendSmsLimit)
    }
}