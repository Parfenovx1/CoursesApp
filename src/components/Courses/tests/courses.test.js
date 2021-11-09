import React from 'react';
import Courses from './../Courses';
import {
	render as rtlRender,
	screen,
	fireEvent,
	getByTestId,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
	courses: [
		{
			title: 'react12345',
			description: 'vASYLIIYYYYYYYI',
			duration: 114,
			authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
			creationDate: '14/10/2021',
			id: '55tnn7dc-29a5-4619-887b-aaeb7bbc8177',
		},
		{
			title: 'react12345',
			description: 'vASYLIIYYYYYYYI',
			duration: 114,
			authors: ['40b21bd5-cbae-4f33-b154-0252b1ae03a9'],
			creationDate: '14/10/2021',
			id: '55tnn7dc-29a5-4619-887b-aaeb7bbc8177',
		},
	],
	authors: [
		{
			name: 'author4',
			id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
		},
	],
};

const mockedStore = configureStore({
	reducer: (state) => state,
	middleware: (getDefaultMiddleware) => {
		let a = getDefaultMiddleware();
		return a;
	},
	preloadedState: mockedState,
});

// const mockedStore = {
// 	getState: () => mockedState,
// 	subscribe: jest.fn(),
// 	dispatch: jest.fn((fn) => {
// 		let a = 1;
// 		fn();
// 	}),
// };
const render = (component) =>
	rtlRender(
		<Provider store={mockedStore}>
			<BrowserRouter>{component}</BrowserRouter>
		</Provider>
	);

jest.mock('../../../store/user/thunk', () => ({
	me: jest.fn((b) => {
		let a = 1;
		return Promise.resolve(true);
	}),
}));

describe('Courses', () => {
	test('renders Courses', () => {
		render(<Courses />);
		fireEvent.click(screen.getByTestId('button'));
		expect(getByTestId('createCousre')).toBeInTheDocument();
	});
});
