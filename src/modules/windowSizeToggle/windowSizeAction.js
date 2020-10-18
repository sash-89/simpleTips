export const WINDOW_ACTIONS = {
    SIZE_TOGGLE: 'WINDOW_SIZE.SIZE_TOGGLE',
    IPHONE_TOGGLE: 'WINDOW_SIZE.IPHONE_TOGGLE',
    IPHONE_RIGHT_POPUP_TOGGLE: 'WINDOW_SIZE.IPHONE_RIGHT_POPUP_TOGGLE',
}

export const setWindowSize = (windowSize) => ({
    type: WINDOW_ACTIONS.SIZE_TOGGLE,
    payload: windowSize
});

export const toggleFieldInFocus = (toggle) => ({
    type: WINDOW_ACTIONS.IPHONE_TOGGLE,
    payload: toggle
});

export const rightPopupToggle = (toggle) => ({
    type: WINDOW_ACTIONS.IPHONE_RIGHT_POPUP_TOGGLE,
    payload: toggle
});

