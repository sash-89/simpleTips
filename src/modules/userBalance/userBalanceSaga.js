import {put, takeLatest, call} from "@redux-saga/core/effects";
import {userBalanceAPI} from "../../root/api";
import {setUserCardData} from "./userBalanceActions";

export function* requestUserCardDataWatcher (){
    yield takeLatest("USER_BALANCE.REQUEST_CARD_DATA", requestUserCardDataWorker)

}
function* requestUserCardDataWorker (){
    try {
        const userCardData = yield call(userBalanceAPI.getUserCardData);
        yield put(setUserCardData(userCardData));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}
