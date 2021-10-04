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
					<Button handler={() => props.setShow(true)} value='Add new course' />
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

export default Courses;
