import { createSelector } from 'reselect';

const appInitializedData = state => state.appInitialized.initialized;

export const appInitializedSelector = createSelector(appInitializedData, data => data);