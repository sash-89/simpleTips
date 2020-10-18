import {USER_PROFILE} from "./userProfileActions";

const user = JSON.parse(localStorage.getItem('STUser'));

const organization = JSON.parse(localStorage.getItem('STOrganisation'));

let initialState = {
    user: user ? user : null,
    successMessage: null,
    isEmailConfirmed: false,
    confirmEmailErrorMessage: null,

    currentUserOrganization: user ? user.organizations[0] : null,

    organization: organization ? organization : null, //<==adminOrganization

    // "user": {
    //     "id":"5f51cccc352d7477a9d4323c",
    //     "nameForProfile":"Alex",
    //     "firstName":"Alex",
    //     "lastName":"Smith",
    //     "email":null,
    //     "phone":"+79163323256",
    //     "roles":[{"role":"MAID"}],
    //     "created":null,
    //     "blocking":false,
    //     "userID":"1599196364009",
    //     "organizations":[{
    //         "id":"5f5204934e8e0e6ded104a32",
    //         "organizationName":"Zaimix",
    //         "city":"Gyumri",
    //         "address":"aaaat",
    //         "admin":{
    //             "id":"5f51de57352d7477a9d4323f",
    //             "nameForProfile":null,
    //             "firstName":null,
    //             "lastName":null,
    //             "email":null,
    //             "phone":"+37498699667",
    //             "roles":[{"role":"ADMIN"}],
    //             "created":null,
    //             "blocking":false,
    //             "userID":"1599200855981",
    //             "organizations":[]},
    //             "created":[2020,9,4,12,10,43,537000000]}]}

    // "organization": {
    //     "address": "string",
    //     "city": "string",
    //     "organizationName": "string",
    //     "organizationID": "number"
    // }
};


const userProfileReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case USER_PROFILE.SET_USER_DATA:
            localStorage.setItem('STUser', JSON.stringify(payload));
            return {
                ...state,
                user: payload,
            };
        case USER_PROFILE.SET_ORGANIZATION_DATA:
            return {
                ...state,
                organization: {...payload},
            };
        case USER_PROFILE.SET_USER_CURRENT_ORGANIZATION:
            return {
                ...state,
                currentUserOrganization: payload,
            };
        case USER_PROFILE.RESET_USER_AFTER_SING_OUT:
            localStorage.removeItem('STUser');
            localStorage.removeItem('STOrganisation');
            return {
                ...state,
                user: null,
                organization: null
            };
        case USER_PROFILE.UPDATE_USER_PHONE_NUMBER:
            return {
                ...state,
                user: {...user, phone: payload},
            };
        case USER_PROFILE.CONFIRM_EMAIL:
            return {
                ...state,
                isEmailConfirmed: payload
            };
        case USER_PROFILE.SET_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: payload
            };
        case USER_PROFILE.DELETE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: null
            };
        case USER_PROFILE.SET_CONFIRM_EMAIL_ERROR_MESSAGE:
            return {
                ...state,
                confirmEmailErrorMessage: payload
            };
        default:
            return state
    }

};

export default userProfileReducer;