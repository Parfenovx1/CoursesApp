import * as actions from './actionTypes';

const initialState = [];

function courses(courses = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case actions.GET_COURSES:
			return payload;
		case actions.GET_COURSE:
			return payload;
		case actions.ADD_COURSE:
			return [...courses, payload];
		case actions.UPDATE_COURSE:
			return courses.map((course) => {
				if (course.id === payload.id) {
					return {
						...courses,
						...payload,
					};
				} else {
					return course;
				}
			});
		case actions.DELETE_COURSE:
			return courses.filter((course) => {
				return course.id !== payload;
			});
		default:
			return courses;
	}
}

export default courses;
