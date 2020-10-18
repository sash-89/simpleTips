import {put, takeLatest, call} from "@redux-saga/core/effects";
import { userProfileAPI} from "../../root/api";
import {
    confirmEmail,
    setAdminData,
    setConfirmEmailErrorMessage,
    setSuccessMessage,
    setUserData, updatePhoneNumber
} from "./userProfileActions";

export function* requestToUpdateUserDataWatcher (){
    yield takeLatest("USER_PROFILE.REQUEST_TO_UPDATE_USER_DATA", requestToUpdateUserDataWorker)

}
function* requestToUpdateUserDataWorker (action){
    try {
        const userData = yield call(userProfileAPI.updateUserProfile, action.payload);
        yield put(setUserData(userData));
        yield put(setSuccessMessage("personal data changed successfully"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToUpdateAdminDataWatcher (){
    yield takeLatest("USER_PROFILE.REQUEST_TO_UPDATE_ADMIN_DATA", requestToUpdateAdminDataWorker)

}
function* requestToUpdateAdminDataWorker (action){
    try {
        const adminData = yield call(userProfileAPI.updateAdminProfile, action.payload);

        yield put(setUserData(adminData.admin));
        yield put(setAdminData(adminData.address, adminData.city, adminData.organizationName, adminData.id));
        yield put(setSuccessMessage("organisation & administrator data changed successfully"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToChangePhoneNumberWatcher (){
    yield takeLatest("USER_PROFILE.REQUEST_TO_CHANGE_PHONE_NUMBER", requestToChangePhoneNumberWorker)

}
function* requestToChangePhoneNumberWorker (action){
    try {
        yield call(userProfileAPI.changePhoneNumber, action.payload);
        yield put(updatePhoneNumber(action.payload.phoneNumber));
        yield put(setSuccessMessage("phone number changed successfully"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToAddEmailWatcher (){
    yield takeLatest("USER_PROFILE.REQUEST_TO_ADD_EMAIL", requestToAddEmailWorker)

}
function* requestToAddEmailWorker (action){
    try {
        yield call(userProfileAPI.addEmailAndConfirm, action.payload);
        yield put(setSuccessMessage("we sent a confirmation link to your e-mail"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToConfirmEmailWatcher (){
    yield takeLatest("USER_PROFILE.REQUEST_TO_CONFIRM_EMAIL", requestToConfirmEmailWorker)

}
function* requestToConfirmEmailWorker (action){
    try {
       const userData = yield call(userProfileAPI.confirmEmail, action.payload);

       yield put(setUserData(userData.user));

       yield put(confirmEmail(true));

    } catch ({errorCode, user}) {
        if(errorCode === "LINK_ALREADY_USED") yield put(setConfirmEmailErrorMessage("Link has been already used, please try again..."))
        else if(errorCode === "LINK_EXPIRED") yield put(setConfirmEmailErrorMessage("Link expired, please try again..."))
        else yield put(setConfirmEmailErrorMessage("Link is not active, please try again ..."))
    }
}
