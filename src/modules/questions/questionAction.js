export const Q_AND_A = {
  REQUEST_QUESTIONS: 'Q_AND_A.REQUEST_QUESTIONS',
  SET_QUESTIONS: 'Q_AND_A.SET_QUESTIONS',
}


export const setPopularQuestions = (data) => ({
  type: Q_AND_A.SET_QUESTIONS,
  payload: data
});


//sagaActions
export const getPopularQuestions = () => ({
  type: Q_AND_A.REQUEST_QUESTIONS,
})