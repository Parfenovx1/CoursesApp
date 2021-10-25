import * as actions from './actionTypes';

const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

function user(user = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case actions.LOGIN:
			return {
				...user,
				isAuth: true,
				name: payload.name,
				email: payload.email,
				token: payload.token,
				role: payload.role,
			};
		case actions.LOGOUT:
			return {
				...user,
				isAuth: false,
				token: '',
				name: '',
				email: '',
				role: '',
			};
		// case actions.REGISTER:
		// 	return payload;
		default:
			return { ...user };
	}
}

export default user;
