import {AUTH} from "./authActions";

const authToken = localStorage.getItem('STAuthToken');


let initialState = {
  authToken: authToken ? authToken : null,
};

const loginReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case AUTH.LOGIN:
      return {
        ...state,
        authToken: payload,
      };
    case AUTH.SIGN_OUT:
      localStorage.removeItem('STAuthToken');
      return {
        ...state,
        authToken: null,
      };

    default:
      return state
  }

};


export default loginReducer;