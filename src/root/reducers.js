import { combineReducers } from 'redux';
import questionReducer from "../modules/questions/questionReducer";
import loginReducer from '../modules/login/loginReducer';
import authReducer from "../modules/auth/authReducer";
import windowSizeReducer from "../modules/windowSizeToggle/windowSizeReducer";
import userBalanceReducer from "../modules/userBalance/userBalanceReducer";
import userProfileReducer from "../modules/userProfile/userProfileReducer";
import supportReducer from "../modules/support/supportReducer";
import organizationReducer from "../modules/organization/organizationReducer";
import appInitialized from "../modules/appInitialized/appInitializedReducer";



export const reducers = combineReducers({
  appInitialized,
  authReducer,
  loginReducer,
  userProfileReducer,
  userBalanceReducer,
  questionReducer,
  supportReducer,
  organizationReducer,

  windowSizeReducer,
});
