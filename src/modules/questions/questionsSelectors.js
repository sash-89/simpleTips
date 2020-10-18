import { createSelector } from 'reselect';


const questionsAndAnswersData = state => state.questionReducer.questionsAndAnswers;

export const questionsAndAnswersSelector = createSelector(questionsAndAnswersData, data => data);