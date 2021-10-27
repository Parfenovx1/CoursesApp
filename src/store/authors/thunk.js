import * as actions from './actionTypes';
import apiService from '../../apiService';

export const getAuthors = () => async (dispatch) => {
	try {
		const res = await apiService.getAuthors();
		dispatch({
			type: actions.GET_ALL_AUTHORS,
			payload: res.data.result,
		});
		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const createAuthor = (author) => async (dispatch, getState) => {
	try {
		const state = getState();
		const res = await apiService.addAuthor(author, state.user.token);
		dispatch({
			type: actions.CREATE_AUTHOR,
			payload: res.data.result,
		});
		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};
