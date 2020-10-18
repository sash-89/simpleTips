import {USER_PROFILE} from "../userProfile/userProfileActions";

export const ORGANIZATION = {
    SET_ROOMS: 'ORGANIZATION.SET_ROOMS',
    SET_USER_ROOM_LIST: 'ORGANIZATION.SET_USER_ROOM_LIST',
    SET_CURRENT_ROOM: 'ORGANIZATION.SET_CURRENT_ROOM',
    SET_USER_ATTACHED_ROOM: 'ORGANIZATION.SET_USER_ATTACHED_ROOM',
    CHANGE_MODAL_TOGGLE_FOR_ATTACHING_ROOM: 'ORGANIZATION.CHANGE_MODAL_TOGGLE_FOR_ATTACHING_ROOM',
    RESET_ROOMS_AFTER_SING_OUT: 'ORGANIZATION.RESET_ROOMS_AFTER_SING_OUT',
    // SET_USER_ORGANIZATION_ID: 'ORGANIZATION.SET_USER_ORGANIZATION_ID',

    REQUEST_TO_GET_ADMIN_ORGANIZATION: 'ORGANIZATION.REQUEST_TO_GET_ADMIN_ORGANIZATION',
    REQUEST_TO_ADD_ROOM: 'ORGANIZATION.REQUEST_TO_ADD_ROOM',
    REQUEST_TO_ATTACH_ORGANIZATION_FOR_USER: 'ORGANIZATION.REQUEST_TO_ATTACH_ORGANIZATION_FOR_USER',
    REQUEST_TO_GET_ORGANIZATION_ROOMS: 'ORGANIZATION.REQUEST_TO_GET_ORGANIZATION_ROOMS',
    REQUEST_TO_ATTACH_ROOM_FROM_ADMIN: 'ORGANIZATION.REQUEST_TO_ATTACH_ROOM_FROM_ADMIN',

    REQUEST_TO_GET_USER_ORGANIZATION_ROOMS_BY_FLOOR: 'ORGANIZATION.REQUEST_TO_GET_USER_ORGANIZATION_ROOMS_BY_FLOOR',
    REQUEST_TO_GET_USER_ROOM_LIST: 'ORGANIZATION.REQUEST_TO_GET_USER_ROOM_LIST',
    REQUEST_TO_ATTACH_ROOM_FROM_USER: 'ORGANIZATION.REQUEST_TO_ATTACH_ROOM_FROM_USER',

    // REQUEST_TO_GET_ORGANIZATION_BY_ID: 'ORGANIZATION.REQUEST_TO_GET_ORGANIZATION_BY_ID',

};

export const setRooms = (rooms) => ({
    type: ORGANIZATION.SET_ROOMS,
    payload: rooms
});

export const setUserRoomList = (rooms) => ({
    type: ORGANIZATION.SET_USER_ROOM_LIST,
    payload: rooms
});


export const changeModalToggleForAttachingRoomByUser = (toggle) => ({
    type: ORGANIZATION.CHANGE_MODAL_TOGGLE_FOR_ATTACHING_ROOM,
    payload: toggle
});

export const setCurrentRoom = (room) => ({
    type: ORGANIZATION.SET_CURRENT_ROOM,
    payload: room
});

export const setUserAttachedRoom = (room) => ({
    type: ORGANIZATION.SET_USER_ATTACHED_ROOM,
    payload: room
});

export const resetRoomsAfterSignOut = () => ({
    type: ORGANIZATION.RESET_ROOMS_AFTER_SING_OUT
});


// export const setUserOrganizationID = (organizationId) => ({
//     type: ORGANIZATION.SET_USER_ORGANIZATION_ID,
//     payload: organizationId
// });



//sagaActions
export const requestToGetAdminOrganization = () => ({
    type: ORGANIZATION.REQUEST_TO_GET_ADMIN_ORGANIZATION,
});

export const requestToAddRoom = (floor, number, organizationId) => ({
    type: ORGANIZATION.REQUEST_TO_ADD_ROOM,
    payload: {floor, number, organizationId}
});

export const requestToAttachOrganizationForUser = (userID, organizationId) => ({
    type: ORGANIZATION.REQUEST_TO_ATTACH_ORGANIZATION_FOR_USER,
    payload: {userID, organizationId}
});

export const requestToGetOrganizationRooms = () => ({
    type: ORGANIZATION.REQUEST_TO_GET_ORGANIZATION_ROOMS,
});

export const requestToAttachRoomFromAdmin = (userID, roomNumber) => ({
    type: ORGANIZATION.REQUEST_TO_ATTACH_ROOM_FROM_ADMIN,
    payload: {userID, roomNumber}
});

export const requestToUserOrganizationRoomsByFloor = (organizationId, floor) => ({
    type: ORGANIZATION.REQUEST_TO_GET_USER_ORGANIZATION_ROOMS_BY_FLOOR,
    payload: {organizationId, floor}

});

export const requestToGetUserRoomList = (organizationId) => ({
    type: ORGANIZATION.REQUEST_TO_GET_USER_ROOM_LIST,
    payload: {organizationId}
});

export const requestToAttachRoomFromUser = (roomNumber) => ({
    type: ORGANIZATION.REQUEST_TO_ATTACH_ROOM_FROM_USER,
    payload: {roomNumber}
});

// export const requestToGetOrganizationByID = (organizationId) => ({
//     type: ORGANIZATION.REQUEST_TO_GET_ORGANIZATION_BY_ID,
//     payload: organizationId
//
// });
