/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import list from './sorting_reducer/list_reducer';
import grid from './sortest_path_reducer/grid_reducer';

import history from 'utils/history';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    list,
    grid,
    ...injectedReducers,
  });

  return rootReducer;
}
