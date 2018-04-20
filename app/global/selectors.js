import { createSelector } from 'reselect';

const makeSelectGlobal = () => (state) => state.get('global');

const makeSelectExample = () => createSelector(
  makeSelectGlobal(),
  (global) => global.get('example'),
);

export {
  makeSelectGlobal,
  makeSelectExample,
};
