import {all} from "@redux-saga/core/effects";
import {loginWatcher, requestSmsCodeWatcher} from "../modules/login/loginSaga";
import {requestPopularQuestionsWatcher} from "../modules/questions/questionSaga";
import {requestUserCardDataWatcher} from "../modules/userBalance/userBalanceSaga";
import {
  requestToAddEmailWatcher, requestToChangePhoneNumberWatcher,
  requestToConfirmEmailWatcher,
  requestToUpdateAdminDataWatcher,
  requestToUpdateUserDataWatcher
} from "../modules/userProfile/userProfileSaga";
import {requestToGetSupportContactsWatcher, requestToWriteInSupportWatcher} from "../modules/support/supportSaga";
import {
  requestToAddRoomWatcher,
  requestToAttachOrganizationForUserWatcher,
  requestToAttachRoomFromAdminWatcher,
  requestToGetOrganizationRoomsWatcher,
  requestToGetOrganizationByIDWatcher,
  requestToGetUserRoomListWatcher,
  requestToGetAdminOrganizationWatcher,
  requestToGetUserOrganizationRoomsByFloorWatcher,
  requestToAttachRoomFromUserWatcher
} from "../modules/organization/organizationSaga";
import {adminInitializingWatcher} from "../modules/appInitialized/appInitializedSaga";


// export default function* rootSaga () {
//   return [
//     yield fork(loginSaga),
//     yield fork(checkCodeVerification),
//
//
//     yield fork(questionSaga),
//     yield fork(supportTextSaga),
//     yield fork(handleSentMessage),
//     yield fork(userSaga),`
//     yield fork(confirmEmail),
//   ]
// }


export default function* rootSaga (){
  yield all( [requestSmsCodeWatcher(), loginWatcher(), requestUserCardDataWatcher (),
    requestPopularQuestionsWatcher(), requestToUpdateUserDataWatcher(), requestToUpdateAdminDataWatcher(),
    requestToWriteInSupportWatcher(), requestToGetSupportContactsWatcher(),
    requestToChangePhoneNumberWatcher(), requestToAddEmailWatcher(), requestToConfirmEmailWatcher(),
    requestToGetAdminOrganizationWatcher(),
    requestToAddRoomWatcher(), requestToAttachOrganizationForUserWatcher(), requestToGetOrganizationRoomsWatcher(),
    requestToAttachRoomFromAdminWatcher(), requestToGetUserOrganizationRoomsByFloorWatcher(),
    requestToGetUserRoomListWatcher(), requestToAttachRoomFromUserWatcher()
    // requestToGetOrganizationByIDWatcher()
    // adminInitializingWatcher()
  ])
}
