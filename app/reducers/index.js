import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import note from './note';
import todo from './todo'

const rootReducer = combineReducers({
  note,
  todo,
  routing
});

export default rootReducer;
