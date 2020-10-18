export const SUPPORT = {
    SET_SUPPORT_CONTACTS: 'SUPPORT.SET_SUPPORT_CONTACTS',

    WRITE_IN_SUPPORT_REQUEST: 'SUPPORT.WRITE_IN_SUPPORT_REQUEST',
    GET_SUPPORT_CONTACTS_REQUEST: 'SUPPORT.GET_SUPPORT_CONTACTS_REQUEST',
};

export const setSupportContacts = ({supportEmail, supportPhoneNumber}) => ({
    type: SUPPORT.SET_SUPPORT_CONTACTS,
    payload: {supportEmail, supportPhoneNumber}
});


//sagaActions
export const writeInSupport  = (description, emailOrPhoneNumber, name) => ({
    type: SUPPORT.WRITE_IN_SUPPORT_REQUEST,
    payload: {description, emailOrPhoneNumber, name}
});

export const getSupportContacts  = () => ({
    type: SUPPORT.GET_SUPPORT_CONTACTS_REQUEST,
});
