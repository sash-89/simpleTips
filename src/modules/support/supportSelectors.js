import { createSelector } from 'reselect';
import {userSelector} from "../userProfile/userProfileSelectors";


const supportEmailData = state => state.supportReducer.supportEmail;
const supportPhoneNumberData = state => state.supportReducer.supportPhoneNumber;

export const phoneSelector = createSelector(userSelector, data => data.phone);
export const lastNameSelector = createSelector(userSelector, data => data.lastName);

export const supportEmailSelector = createSelector(supportEmailData, data => data);
export const supportPhoneNumberSelector = createSelector(supportPhoneNumberData, data => data);