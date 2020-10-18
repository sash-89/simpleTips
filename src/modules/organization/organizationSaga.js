import {put, takeLatest, call} from "@redux-saga/core/effects";
import {organizationAPI} from "../../root/api";
import {setAdminData, setSuccessMessage} from "../userProfile/userProfileActions";
import {
    requestToGetOrganizationRooms,
    requestToGetOrganizationByID,
    setRooms, setUserRoomList, resetRoomsAfterSignOut, changeModalToggleForAttachingRoomByUser, setUserAttachedRoom,
} from "./organizationActions";
import {initialization} from "../appInitialized/appInitializedActions";


export function* requestToGetAdminOrganizationWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_GET_ADMIN_ORGANIZATION", requestToGetAdminOrganizationWorker)

}
function* requestToGetAdminOrganizationWorker (){
    try {
       const organizationData = yield call(organizationAPI.getAdminOrganization);
       yield put(setAdminData(organizationData.address, organizationData.city, organizationData.organizationName, organizationData.id));

       yield put(initialization());                                      //<==

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToAddRoomWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_ADD_ROOM", requestToAddRoomWorker)

}
function* requestToAddRoomWorker (action){
    try {
        yield call(organizationAPI.addRoom, action.payload);
        yield put(requestToGetOrganizationRooms());
        yield put(setSuccessMessage("number added"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToAttachOrganizationForUserWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_ATTACH_ORGANIZATION_FOR_USER", requestToAttachOrganizationForUserWorker)

}
function* requestToAttachOrganizationForUserWorker (action){
    try {
        yield call(organizationAPI.attachOrganizationForUser, action.payload);
        yield put(setSuccessMessage("invitation sent"));
        // yield put(setUserData(userData));
        // yield put(setSuccessMessage("personal data changed successfully"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToGetOrganizationRoomsWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_GET_ORGANIZATION_ROOMS", requestToGetOrganizationRoomsWorker)

}
function* requestToGetOrganizationRoomsWorker() {
    try {
        const roomsData = yield call(organizationAPI.getOrganizationRooms);
        debugger
        yield put(setRooms(roomsData));


    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToAttachRoomFromAdminWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_ATTACH_ROOM_FROM_ADMIN", requestToAttachRoomFromAdminWorker)

}
function* requestToAttachRoomFromAdminWorker (action) {
    try {
        yield call(organizationAPI.attachRoomFromAdmin, action.payload);
        yield put(requestToGetOrganizationRooms())
        yield put(setSuccessMessage("employee attached"));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToGetUserOrganizationRoomsByFloorWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_GET_USER_ORGANIZATION_ROOMS_BY_FLOOR", requestToGetUserOrganizationRoomsByFloorWorker)

}
function* requestToGetUserOrganizationRoomsByFloorWorker(action) {
    try {
        const roomListData = yield call(organizationAPI.getUserOrganizationRoomsByFloor, action.payload);
        yield put(setRooms(roomListData));

    } catch (errMessages) {
        if(errMessages === "ROOMS_IS_EMPTY") yield put(resetRoomsAfterSignOut()) //<== ??delete
    }
}




export function* requestToGetUserRoomListWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_GET_USER_ROOM_LIST", requestToGetUserRoomListWorker)

}
function* requestToGetUserRoomListWorker(action) {
    try {
        const roomListData = yield call(organizationAPI.getUserRoomList, action.payload);
        const floorList = [];    //<== uniqueFloorList
        const userRoomList = [];

        roomListData.map(f => floorList.push(f.floor));

        floorList.map((item, i) => {
            if(floorList.indexOf(item) === i) userRoomList.push({floorNumber: item, rooms: []})} );


        userRoomList.map(list => {
            roomListData.map(f=> {
                if (list.floorNumber === f.floor) {
                    return list.rooms.push(+f.number)
                }
            })
        });

        yield put(setUserRoomList(userRoomList));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}




export function* requestToAttachRoomFromUserWatcher (){
    yield takeLatest("ORGANIZATION.REQUEST_TO_ATTACH_ROOM_FROM_USER", requestToAttachRoomFromUserWorker)

}
function* requestToAttachRoomFromUserWorker(action) {
    try {
        const roomData = yield call(organizationAPI.attachRoomFromUser, action.payload);
        yield put(changeModalToggleForAttachingRoomByUser(false));
        yield put(setUserAttachedRoom(roomData));

    } catch ({errorCode, resendSmsLimit}) {
        // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
        // console.log(errorCode, resendSmsLimit)
    }
}


// export function* requestToGetOrganizationByIDWatcher (){
//     yield takeLatest("ORGANIZATION.REQUEST_TO_GET_ORGANIZATION_BY_ID", requestToGetOrganizationByIDWorker)
//
// }
// function* requestToGetOrganizationByIDWorker(action) {
//     try {
//         const roomsData = yield call(organizationAPI.getOrganizationByID, action.payload);
//         yield put(setRooms(roomsData.rooms));
//
//     } catch ({errorCode, resendSmsLimit}) {
//         // if(errorCode === "RESEND_SMS_IS_BLOCKED") yield put(smsCodeNotSent())
//         // console.log(errorCode, resendSmsLimit)
//     }
// }

