import reducer from './../reducer';
import * as actions from './../actionTypes';

describe('courses reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual([]);
	});
	it('should handle GET_COURSES and returns new state', () => {
		const action = {
			type: actions.GET_COURSES,
			payload: {
				courses: [
					{
						title: 'react12345',
						description: 'vASYLIIYYYYYYYI',
						duration: 114,
						authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
						creationDate: '14/10/2021',
						id: '55tnn7dc-29a5-4619-887b-aaeb7bbc8177',
					},
				],
			},
		};
		const initialState = undefined;
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual({
			courses: [
				{
					title: 'react12345',
					description: 'vASYLIIYYYYYYYI',
					duration: 114,
					authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
					creationDate: '14/10/2021',
					id: '55tnn7dc-29a5-4619-887b-aaeb7bbc8177',
				},
			],
		});
	});
	it('should handle ADD_COURSE and returns new state', () => {
		const action = {
			type: actions.ADD_COURSE,
			payload: {
				courses: [
					{
						title: 'react12345',
						description: 'vASYLIIYYYYYYYI',
						duration: 114,
						authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
						creationDate: '14/10/2021',
						id: '55tnn7dc-29a5-4619-887b-aaeb7bbc8177',
					},
				],
			},
		};
		const initialState = undefined;
		const nextState = reducer(initialState, action);

		expect(nextState).toEqual([
			{
				courses: [
					{
						title: 'react12345',
						description: 'vASYLIIYYYYYYYI',
						duration: 114,
						authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
						creationDate: '14/10/2021',
						id: '55tnn7dc-29a5-4619-887b-aaeb7bbc8177',
					},
				],
			},
		]);
	});
});
