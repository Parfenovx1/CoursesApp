import React, { useState } from 'react';
import './Courses.css';
import Button from '../Button/Button';
import Search from '../Search/Search';
import CourseCard from '../CourseCard/CourseCard';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

function Courses(props) {
	const [inputValue, setValue] = useState('');
	let courses = props.courses;
	const history = useHistory();

	courses = courses.filter((course) => {
		return course.title.toLowerCase().includes(inputValue.toLowerCase());
	});

	return (
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
	);
}

Courses.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
};

export default Courses;
