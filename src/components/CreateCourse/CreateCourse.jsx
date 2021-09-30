import React, { useState } from 'react';
import './CreateCourse.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import mockedCoursesList from '../../sampleCourses';
import mockedAuthorsList from '../../sampleAuthors';

function CreateCourse(props) {
	const [inputValue, setInputValue] = useState();
	let [authors, setAuthors] = useState(mockedAuthorsList);
	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return hours + ':' + minutes;
	}
	return (
		<div className='create-course-wrapper'>
			<div className='create-course-header-wrapper'>
				<Input description='Title' placeholder='Enter title...' />
				<Button setShow={props.setShow} value='Create course' />
			</div>
			<div className='create-course-desc-wrapper'>
				<textarea
					name='desc'
					className='desc'
					placeholder='Enter description'
				></textarea>
			</div>
			<div className='create-course-main-wrapper'>
				<div className='leftside'>
					<div className='add-author-wrapper'>
						<span className='add-author-title'>
							<b>Add author</b>
						</span>
						<Input
							description='Author name'
							placeholder='Enter author name...'
						/>
						<Button value='Create author' />
					</div>
					<div className='duration-wrapper'>
						<span className='duration-title'>
							<b>Duration</b>
						</span>
						<Input
							description='Duration'
							placeholder='Enter duration in minutes...'
							setInputValue={setInputValue}
						/>
					</div>
					<p>
						Duration: {inputValue ? getTimeFromMins(inputValue) : '00:00'} hours
					</p>
				</div>
				<div className='rightside'>
					<div className='authors-list'>
						<span>Authors</span>
						<ul>
							{authors.map((author) => {
								return (
									<div className='author-item'>
										<li>{author.name}</li> <Button value='Add author' />
									</div>
								);
							})}
						</ul>
					</div>
					<div className='course-authors'>
						<span>Authors</span>
						<span>Authors list is empty</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCourse;
