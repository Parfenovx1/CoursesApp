import * as actions from './actionTypes';
import apiService from '../../apiService';

export const login = (obj) => async (dispatch) => {
	try {
		const loginResponse = await apiService.login(obj);
		localStorage.setItem('token', loginResponse.data.result);
		dispatch({
			type: actions.LOGIN,
			payload: {
				token: loginResponse?.data?.result,
				name: loginResponse?.data?.user.name,
				email: loginResponse?.data?.user.email,
			},
		});
		return Promise.resolve();
	} catch (err) {
		return Promise.reject(err);
	}
};

export const me = () => async (dispatch) => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			return Promise.resolve(false);
		}
		const res = await apiService.me(token);
		dispatch({
			type: actions.LOGIN,
			payload: {
				token: token,
				name: res.data.result.name,
				email: res.data.result.email,
				role: res.data.result.role,
			},
		});
		return Promise.resolve(true);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const logout = () => async (dispatch, getState) => {
	try {
		const state = getState();
		const res = await apiService.logout(state.user.token);
		dispatch({
			type: actions.LOGOUT,
			payload: res.data,
		});
		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const register = (obj) => async (dispatch) => {
	try {
		const res = await apiService.register(obj);
		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};
