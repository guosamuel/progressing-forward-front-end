import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import projectsReducer from './projectsReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
  usersReducer,
  projectsReducer,
  tasksReducer
});
