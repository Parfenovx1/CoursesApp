import React, { useState } from 'react';
import './Courses.css';
import CourseForm from '../CourseForm/CourseForm';
import CourseInfo from '../CourseInfo/CourseInfo';
import Button from '../Button/Button';
import Search from '../Search/Search';
import CourseCard from '../CourseCard/CourseCard';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import * as courseActionCreators from '../../store/courses/thunk';
import * as authorActionCreators from '../../store/authors/thunk';
import * as userActionCreators from '../../store/user/thunk';
import { Switch, Route } from 'react-router-dom';

function Courses(props) {
	const [inputValue, setValue] = useState('');
	let courses = props.courses;
	const history = useHistory();
	useEffect(() => {
		props.me().then((response) => {
			if (!response) {
				history.push('/login');
				return;
			}
			props.getCourses();
			props.getAuthors();
		});
	}, []);

	courses = courses.filter((course) => {
		return course.title.toLowerCase().includes(inputValue.toLowerCase());
	});

	return (
		<Switch>
			<Route exact path='/courses'>
				<div className='courses-wrapper'>
					<div className='courses-top-wrapper'>
						<div className='search-wrapper'>
							<Search setValue={setValue} placeholder='Enter course name...' />
						</div>
						<div className='add-button-wrapper'>
							<Button
								handler={() => {
									history.push('/courses/add');
								}}
								value='Add new course'
							/>
						</div>
					</div>
					<ul>
						{courses.map((course) => {
							let authorsArray = props.authors.filter((author) =>
								course.authors.includes(author.id)
							);
							return (
								<li key={course.id}>
									<CourseCard
										id={course.id}
										title={course.title}
										description={course.description}
										creationDate={course.creationDate}
										duration={course.duration}
										authors={authorsArray.map((author) => author.name)}
									/>
								</li>
							);
						})}
					</ul>
				</div>
			</Route>
			<PrivateRoute exact path='/courses/add' component={CourseForm} />
			<PrivateRoute exact path='/courses/update/:id' component={CourseForm} />
			<Route path='/courses/:id' component={CourseInfo} />
		</Switch>
	);
}

Courses.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	getCourses: PropTypes.func.isRequired,
	getAuthors: PropTypes.func.isRequired,
	me: PropTypes.func.isRequired,
};

const mapActionsToProps = {
	getCourses: courseActionCreators.getCourses,
	getAuthors: authorActionCreators.getAuthors,
	me: userActionCreators.me,
};

function mapStateToProps(state) {
	return { courses: state.courses, authors: state.authors, user: state.user };
}

export default connect(mapStateToProps, mapActionsToProps)(Courses);
