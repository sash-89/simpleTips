export const USER_BALANCE = {
    REQUEST_CARD_DATA: 'USER_BALANCE.REQUEST_CARD_DATA',

    SET_CARD_DATA: 'USER_BALANCE.SET_CARD_DATA',
};

export const setUserCardData = ({exp_month, exp_year, last4}) => ({
    type: USER_BALANCE.SET_CARD_DATA,
    payload: {exp_month, exp_year, last4}
});

//sagaActions
export const requestUserCardData = () => ({
    type: USER_BALANCE.REQUEST_CARD_DATA,
});
