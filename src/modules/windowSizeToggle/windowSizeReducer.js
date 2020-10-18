import {WINDOW_ACTIONS} from "./windowSizeAction";

const initialState = {
    windowSize: window.innerWidth < 1024,
    isFiendInFocus: false,
    isRightPopupOpen: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case WINDOW_ACTIONS.SIZE_TOGGLE:
            return {
                ...state,
                windowSize: action.payload
            };
        case WINDOW_ACTIONS.IPHONE_TOGGLE:
            return {
                ...state,
                isFiendInFocus: action.payload
            };
        case WINDOW_ACTIONS.IPHONE_RIGHT_POPUP_TOGGLE:
            return {
                ...state,
                isRightPopupOpen: action.payload
            };
        default:
            return state;
    }
}
