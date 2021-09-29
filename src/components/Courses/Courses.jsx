import React from 'react';
import './Courses.css';
import Button from '../Button/Button';
import Input from '../Input/Input';
import CourseCard from '../CourseCard/CourseCard';
import mockedCoursesList from '../../sampleCourses';
import mockedAuthorsList from '../../sampleAuthors';

function Courses() {
	return (
		<div className='courses-wrapper'>
			<div className='courses-top-wrapper'>
				<div className='search-wrapper'>
					<Input placeholder='Enter course name or id...' />
					<Button value='Search' />
				</div>
				<div className='add-button-wrapper'>
					<Button value='Add new course' />
				</div>
			</div>
			<ul>
				{mockedCoursesList.map((course) => {
					let authorsArray = mockedAuthorsList.filter((author) =>
						course.authors.includes(author.id)
					);
					console.log(authorsArray);
					return (
						<CourseCard
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
