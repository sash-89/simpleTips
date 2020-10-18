import {ORGANIZATION} from "./organizationActions";

const organization = JSON.parse(localStorage.getItem('STOrganisation'));

let initialState = {

    organization: organization ? organization : null,
    // currentUserOrganization: user ? user.organizations[0] : null,

    rooms: [],
    currentRoom: null,
    userRoomList: [],
    modalToggleForAttachingRoomByUser: false,
    // userOrganizationID: null

    // "organization": {
    //     "address": "string",
    //     "city": "string",
    //     "organizationName": "string",
    //     "organizationID": "number"
    // }
};

const organizationReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case ORGANIZATION.SET_ROOMS:
            return {
                ...state,
                rooms: payload,
            };
        case ORGANIZATION.SET_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: payload,
            };
        case ORGANIZATION.SET_USER_ROOM_LIST:
            return {
                ...state,
                userRoomList: payload,
            };
        case ORGANIZATION.SET_USER_ATTACHED_ROOM:
            return {
                ...state,
                rooms: state.rooms.map(room =>{if(room.number === payload.number) return payload
                    else return room}),
                userRoomList: state.userRoomList.map(list =>{if(list.floorNumber === payload.floor) return {...list, rooms: [...list.rooms , payload.number]}
                else return list}),
            };
        case ORGANIZATION.CHANGE_MODAL_TOGGLE_FOR_ATTACHING_ROOM:
            return {
                ...state,
                modalToggleForAttachingRoomByUser: payload,
            };
        case ORGANIZATION.RESET_ROOMS_AFTER_SING_OUT:
            return {
                ...state,
                rooms: [],
            };
        // case ORGANIZATION.SET_USER_ROOM_LIST:
        //     return {
        //         ...state,
        //         userRoomList: payload,
        //     };
        // case ORGANIZATION.SET_USER_ORGANIZATION_ID:
        //     return {
        //         ...state,
        //         userOrganizationID: payload,
        //     };

        default:
            return state
    }

};

export default organizationReducer;