import { createStore, applyMiddleware } from 'redux';
import { reducers } from './reducers'
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import {authTokenSelector} from "../modules/auth/authSelectors";
import {setAuthToken} from "./api";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore( reducers, applyMiddleware(sagaMiddleware) );

sagaMiddleware.run(rootSaga);


store.subscribe(() => {
    const token = authTokenSelector(store.getState());
    setAuthToken(token)
});

window.store = store;