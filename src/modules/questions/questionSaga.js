import { call, put, takeLatest } from 'redux-saga/effects'
import {popularQuestionsAPI} from "../../root/api";
import {setPopularQuestions} from "./questionAction";




export function* requestPopularQuestionsWatcher (){
  yield takeLatest("Q_AND_A.REQUEST_QUESTIONS", requestPopularQuestionsWorker)

}
function* requestPopularQuestionsWorker (action){
  try {
    const popularQuestionsData = yield call(popularQuestionsAPI.getPopularQuestions, action.payload);

    const questions = [];
    popularQuestionsData.map(item => questions.push({
      question: Object.keys(item.popularQuestion)[0],
      answers: Object.values(item.popularQuestion)[0]
    }));

    yield put(setPopularQuestions(questions));

  } catch ({errorCode, resendSmsLimit}) {
    // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
    // console.log(errorCode, resendSmsLimit)
  }
}
