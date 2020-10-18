import {SUPPORT} from "./supportActions";

let initialState = {
    supportEmail: null,
    supportPhoneNumber: null
};


const supportReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case SUPPORT.SET_SUPPORT_CONTACTS:
            return {
                ...state,
                supportEmail: payload.supportEmail,
                supportPhoneNumber: payload.supportPhoneNumber,
            };
        default:
            return state
    }

};

export default supportReducer;