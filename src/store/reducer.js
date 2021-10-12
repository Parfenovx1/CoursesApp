import { combineReducers } from 'redux';
import user from './user/reducer';
import courses from './courses/reducer';
import authors from './authors/reducer';

export default combineReducers({
	user,
	courses,
	authors,
});
