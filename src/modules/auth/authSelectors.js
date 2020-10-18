import { createSelector } from 'reselect';

const authTokenData = state => state.authReducer.authToken;

export const authTokenSelector = createSelector(authTokenData, data => data);