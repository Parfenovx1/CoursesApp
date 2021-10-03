import React, { useState } from 'react';
import './Courses.css';
import Button from '../Button/Button';
import Search from '../Search/Search';
import CourseCard from '../CourseCard/CourseCard';

function Courses(props) {
	const [inputValue, setValue] = useState('');
	let courses = props.courses;

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
					<Button setShow={props.setShow} value='Add new course' />
				</div>
			</div>
			<ul>
				{courses.map((course, key) => {
					let authorsArray = props.authors.filter((author) =>
						course.authors.includes(author.id)
					);
					return (
						<CourseCard
							key={course.id}
							title={course.title}
							description={course.description}
							creationDate={course.creationDate}
							duration={course.duration}
							authors={authorsArray.map((author) => author.name)}
						/>
					);
				})}
			</ul>
		</div>
	);
}

export default Courses;
