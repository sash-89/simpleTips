import {INITIALIZED} from "./appInitializedActions";

let initialState = {
  initialized: false
};

const appInitializedReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case INITIALIZED.SUCCESSFULLY:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state
  }
};


export default appInitializedReducer;