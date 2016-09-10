import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import note from './note';

const rootReducer = combineReducers({
  note,
  routing
});

export default rootReducer;
