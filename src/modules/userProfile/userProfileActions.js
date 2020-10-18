export const USER_PROFILE = {
    SET_USER_DATA: 'USER_PROFILE.SET_USER_DATA',
    SET_ORGANIZATION_DATA: 'USER_PROFILE.SET_ORGANIZATION_DATA',
    SET_USER_CURRENT_ORGANIZATION: 'USER_PROFILE.SET_USER_CURRENT_ORGANIZATION',
    RESET_USER_AFTER_SING_OUT: 'USER_PROFILE.RESET_USER_AFTER_SING_OUT',

    UPDATE_USER_PHONE_NUMBER: 'USER_PROFILE.UPDATE_USER_PHONE_NUMBER',

    CONFIRM_EMAIL: 'USER_PROFILE.CONFIRM_EMAIL',

    SET_SUCCESS_MESSAGE: 'USER_PROFILE.SET_SUCCESS_MESSAGE',
    DELETE_SUCCESS_MESSAGE: 'USER_PROFILE.DELETE_SUCCESS_MESSAGE',

    SET_CONFIRM_EMAIL_ERROR_MESSAGE: 'USER_PROFILE.SET_CONFIRM_EMAIL_ERROR_MESSAGE',


    REQUEST_TO_UPDATE_USER_DATA: 'USER_PROFILE.REQUEST_TO_UPDATE_USER_DATA',
    REQUEST_TO_UPDATE_ADMIN_DATA: 'USER_PROFILE.REQUEST_TO_UPDATE_ADMIN_DATA',
    REQUEST_TO_CHANGE_PHONE_NUMBER: 'USER_PROFILE.REQUEST_TO_CHANGE_PHONE_NUMBER',
    REQUEST_TO_ADD_EMAIL: 'USER_PROFILE.REQUEST_TO_ADD_EMAIL',
    REQUEST_TO_CONFIRM_EMAIL: 'USER_PROFILE.REQUEST_TO_CONFIRM_EMAIL',
};

export const setUserData = (user) => ({
    type: USER_PROFILE.SET_USER_DATA,
    payload: user
});

export const setUserCurrentOrganization = (organization) => ({
    type: USER_PROFILE.SET_USER_CURRENT_ORGANIZATION,
    payload: organization
});

export const setAdminData = (address, city, organizationName, id) => ({
    type: USER_PROFILE.SET_ORGANIZATION_DATA,
    payload: {address, city, organizationName, id}
});

export const resetUserAfterSignOut = () => ({
    type: USER_PROFILE.RESET_USER_AFTER_SING_OUT
});

export const updatePhoneNumber = (phoneNumber) => ({
    type: USER_PROFILE.UPDATE_USER_PHONE_NUMBER,
    payload: phoneNumber
});

export const confirmEmail = (toggle) => ({
    type: USER_PROFILE.CONFIRM_EMAIL,
    payload: toggle
});

export const setSuccessMessage = (successMessage) => ({
    type: USER_PROFILE.SET_SUCCESS_MESSAGE,
    payload: successMessage
});

export const deleteSuccessMessage = () => ({
    type: USER_PROFILE.DELETE_SUCCESS_MESSAGE,
});

export const setConfirmEmailErrorMessage = (errorMessage) => ({
    type: USER_PROFILE.SET_CONFIRM_EMAIL_ERROR_MESSAGE,
    payload: errorMessage
});


//sagaActions
export const requestToUpdateUserData = (nameForProfile, firstName, lastName) => ({
    type: USER_PROFILE.REQUEST_TO_UPDATE_USER_DATA,
    payload: {nameForProfile, firstName, lastName}
});

export const requestToUpdateAdminData = (address, city, organizationName) => ({
    type: USER_PROFILE.REQUEST_TO_UPDATE_ADMIN_DATA,
    payload: {address, city, organizationName}
});

export const requestToChangePhoneNumber = (code, phoneNumber) => ({
    type: USER_PROFILE.REQUEST_TO_CHANGE_PHONE_NUMBER,
    payload: {code, phoneNumber}
});

export const requestToAddEmail = (email) => ({
    type: USER_PROFILE.REQUEST_TO_ADD_EMAIL,
    payload: {email}
});

export const requestToConfirmEmail = (code) => ({
    type: USER_PROFILE.REQUEST_TO_CONFIRM_EMAIL,
    payload: {code}
});
