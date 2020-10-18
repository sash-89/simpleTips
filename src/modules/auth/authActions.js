export const AUTH = {
    LOGIN: 'AUTH.LOGIN',
    SIGN_OUT: 'AUTH.SIGN_OUT',
};

export const loginSuccess = (authToken) => ({
    type: AUTH.LOGIN,
    payload: authToken
});

export const signOut = () => ({
    type: AUTH.SIGN_OUT
});
