import * as ActionTypes from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case ActionTypes.FETCH_URLS:
      return { ...state, urlList: action.payload };

    case ActionTypes.SHORTEN_URL:
      return { ...state, newUrl: action.payload.url, isOpen: true };

    case ActionTypes.CLOSE_MODAL:
      return { ...state, isOpen: false };

    default:
      return state;
  }
}