import {put, takeLatest, call} from "@redux-saga/core/effects";
import {supportAPI} from "../../root/api";
import {setSupportContacts} from "./supportActions";

export function* requestToWriteInSupportWatcher() {
    yield takeLatest("SUPPORT.WRITE_IN_SUPPORT_REQUEST", requestToWriteInSupportWorker)

}

function* requestToWriteInSupportWorker(action) {
    try {
        yield call(supportAPI.writeInSupport, action.payload);

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}



export function* requestToGetSupportContactsWatcher() {
    yield takeLatest("SUPPORT.GET_SUPPORT_CONTACTS_REQUEST", requestToGetSupportContactsWorker)

}

function* requestToGetSupportContactsWorker() {
    try {
        const contacts = yield call(supportAPI.getSupportContacts);
        yield put(setSupportContacts(contacts));


    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}
