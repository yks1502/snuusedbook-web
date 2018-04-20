import { createReducer, createActions } from 'reduxsauce';
import { fromJS } from 'immutable';
import normalize from 'json-api-normalizer';

/* ------------- Types and Action Creators ------------- */

export const { Types, Creators } = createActions({
  normalizeData: ['data'],
  exampleRequest: ['data'],
  exampleSuccess: ['payload'],
  exampleFailure: ['error'],
});

/* ------------- Initial State ------------- */

export const initialState = fromJS({
  entities: null,
  example: {
    isFetching: false,
    payload: null,
    error: null,
  },
});

/* ------------- Reducers ------------- */

export const normalizeData = (state, { data }) =>
  state.mergeDeep({ entities: normalize(data) });

export const exampleSuccess = (state) =>
  state.mergeDeep({ example: { isFetching: true, error: null } });

export const exampleSuccess = (state, { payload }) =>
  state.mergeDeep({ example: { isFetching: false, payload, error: null } });

export const exampleFailure = (sate, { error }) =>
  state.mergeDeep({ example: { isFetching: false, payload: null, error } });

/* ------------- Hookup Reducers To Types ------------- */

export default createReducer(initialState, {
  [Types.NORMALIZE_DATA]: normalizeData,
  [Types.EXAMPLE_REQUEST]: exampleRequest,
  [Types.EXAMPLE_SUCCESS]: exampleSuccess,
  [Types.EXAMPLE_FAILURE]: exampleFailure,
});
