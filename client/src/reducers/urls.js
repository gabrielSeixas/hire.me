import * as ActionTypes from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case ActionTypes.FETCH_URLS:
      return [ ...state, ...action.payload ];

    default:
      return state;
  }
}