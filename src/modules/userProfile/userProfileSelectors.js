import { createSelector } from 'reselect';


const userData = state => state.userProfileReducer.user;
const successMessageData = state => state.userProfileReducer.successMessage;
const isEmailConfirmedData = state => state.userProfileReducer.isEmailConfirmed;
const confirmEmailErrorMessageData = state => state.userProfileReducer.confirmEmailErrorMessage;
const adminOrganizationData = state => state.userProfileReducer.organization;
const currentUserOrganizationData = state => state.userProfileReducer.currentUserOrganization;

export const userSelector = createSelector(userData, data => data);
export const userFullNameSelector = createSelector(userSelector, data => `${data.firstName} ${data.lastName}`);
export const phoneNumberSelector = createSelector(userSelector, data => data.phone);
export const emailSelector = createSelector(userSelector, data => data.email);
export const roleSelector = createSelector(userSelector, data => data && data.roles[0].role);
export const successMessageSelector = createSelector(successMessageData, data => data);
export const isEmailConfirmedSelector = createSelector(isEmailConfirmedData, data => data);
export const confirmEmailErrorMessageSelector = createSelector(confirmEmailErrorMessageData, data => data);
export const adminOrganizationSelector = createSelector(adminOrganizationData, data => data);
export const adminOrganizationIDSelector = createSelector(adminOrganizationSelector, data => data && data.id);

export const userOrganizationsSelector = createSelector(userSelector, data => data.organizations);
export const currentUserOrganizationSelector = createSelector(currentUserOrganizationData, data => data);