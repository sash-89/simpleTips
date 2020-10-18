import { createSelector } from 'reselect';

const cardDataData = state => state.userBalanceReducer.cardData;

export const cardDataSelector = createSelector(cardDataData, data => data);