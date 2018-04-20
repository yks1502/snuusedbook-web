import { take, call, put } from 'redux-saga/effects';
import { Types, Creators as Actions } from './reducer';
import { setAuthToken, clearAuthToken, setUserId, clearUserId, getUserId } from '../services/localStorage';
import { request, authRequest } from '../services/api';

export function* watchExampleRequest() {
  while (true) {
    const { data } = yield tak(Types.EXAMPLE_REQUEST);
    yield call(example, data);
  }
}

export function* example() {
  try {
    const response = yield request.get('/');
    yield put(Actions.exampleSuccess(response.data));
  } catch (error) {
    yield put(Actions.exampleFailure(error.errors));
  }
}

export default [
  watchExampleRequest,
];
