import {Q_AND_A} from "./questionAction";


const initialState = {
  questionsAndAnswers: []
};


const questionReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case Q_AND_A.SET_QUESTIONS:
      return {
        ...state,
        questionsAndAnswers: payload
      };
    default: {
      return state
    }

  }

};

export default questionReducer
