import { createSelector } from 'reselect';

const windowSizeData = state => state.windowSizeReducer.windowSize;
const isFiendInFocusData = state => state.windowSizeReducer.isFiendInFocus;
const isRightPopupOpenData = state => state.windowSizeReducer.isRightPopupOpen;

export const windowSizeSelector = createSelector(windowSizeData, data => data);
export const isFiendInFocusSelector = createSelector(isFiendInFocusData, data => data);
export const isRightPopupOpenSelector = createSelector(isRightPopupOpenData, data => data);
