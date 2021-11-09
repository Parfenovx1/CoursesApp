import React from 'react';
import CourseCard from './../CourseCard';
import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom/extend-expect';

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
	],
	authors: [
		{
			name: 'author4',
			id: '40b21bd5-cbae-4f33-b154-0252b1ae03a9',
		},
	],
};
const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};
const render = (component) =>
	rtlRender(<Provider store={mockedStore}>{component}</Provider>);

describe('CourseCard', () => {
	test('renders CourseCard', () => {
		render(
			<CourseCard
				title={mockedState.courses[0].title}
				description={mockedState.courses[0].description}
				creationDate={mockedState.courses[0].creationDate}
				duration={mockedState.courses[0].duration}
				authors={mockedState.courses[0].authors}
			/>
		);
		expect(screen.queryByText('react12345')).toBeInTheDocument();
		expect(screen.queryByText('vASYLIIYYYYYYYI')).toBeInTheDocument();
		expect(screen.queryByText('01:54 hours')).toBeInTheDocument();
	});
});
