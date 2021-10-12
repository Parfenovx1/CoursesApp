import * as actions from './actionTypes';
import apiService from '../../apiService';

export const getCourses = () => async (dispatch) => {
	try {
		const res = await apiService.getCourses();
		dispatch({
			type: actions.GET_COURSES,
			payload: res.data.result,
		});
		return Promise.resolve();
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getCourse = (id) => async (dispatch) => {
	try {
		const res = await apiService.getCourse(id);
		return Promise.resolve(res.data.result);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const addCourse = (course) => async (dispatch, getState) => {
	try {
		const state = getState();
		const res = await apiService.addCourse(course, state.user.token);
		dispatch({
			type: actions.ADD_COURSE,
			payload: res.data.result,
		});
		return Promise.resolve();
	} catch (err) {
		return Promise.reject(err);
	}
};

export const updateCourse =
	(id, updatedCourse) => async (dispatch, getState) => {
		try {
			const state = getState();
			const res = await apiService.updateCourse(
				id,
				updatedCourse,
				state.user.token
			);
			dispatch({
				type: actions.UPDATE_COURSE,
				payload: updatedCourse,
			});
			return Promise.resolve(res.data);
		} catch (err) {
			return Promise.reject(err);
		}
	};

export const deleteCourse = (id) => async (dispatch, getState) => {
	try {
		const state = getState();
		const res = await apiService.updateCourse(id, state.user.token);
		dispatch({
			type: actions.DELETE_COURSE,
			payload: id,
		});
		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};
