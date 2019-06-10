import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import projectsReducer from './projectsReducer';

export default combineReducers({
  usersReducer,
  projectsReducer
});
