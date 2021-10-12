import * as actions from './actionTypes';

const initialState = [];

function authors(authors = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case actions.GET_ALL_AUTHORS:
			return payload;
		case actions.CREATE_AUTHOR:
			return [...authors, payload];
		default:
			return authors;
	}
}

export default authors;
