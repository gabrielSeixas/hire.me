import { combineReducers } from 'redux';
import urlsReducers from './urls';

const rootReducer = combineReducers({
  urls: urlsReducers
});

export default rootReducer;