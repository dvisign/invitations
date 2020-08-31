import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import invitation from './invitation';

axios.defaults.baseURL = process.env.REACT_APP_PRODUCTION === 'production' ? 'http://dvnode.gabia.io/api' : 'http://localhost:5000/api';

export default function* rootSaga() { // 제너레이터 문법
  yield all([
    call(invitation)
  ])
};