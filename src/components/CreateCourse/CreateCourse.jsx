import React, { useState } from 'react';
import './CreateCourse.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { v4 as uuidv4 } from 'uuid';

function CreateCourse(props) {
	const [inputValue, setInputValue] = useState();
	let [courseAuthors, setCourseAuthors] = useState([]);
	let setAuthors = props.setAuthors;
	let setCourses = props.setCourses;
	let course = { authors: [] };

	let nameRef = React.createRef();
	let titleRef = React.createRef();
	let descriptionRef = React.createRef();
	let durationRef = React.createRef();

	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return hours + ':' + minutes;
	}

	function addAuthor(author) {
		setCourseAuthors([...courseAuthors, author.id]);
	}

	function createAuthor() {
		const author = {
			id: uuidv4(),
			name: nameRef.current.value,
		};
		setAuthors([...props.authors, author]);
	}

	function deleteAuthor(author) {
		courseAuthors = courseAuthors.filter((courseAuthor) => {
			return courseAuthor.id !== author.id;
		});
		setCourseAuthors(courseAuthors);
	}

	function createCourse(isSetShow) {
		course = {
			id: uuidv4(),
			title: titleRef.current.value,
			description: descriptionRef.current.value,
			creationDate: Date.now(),
			duration: durationRef.current.value,
			authors: courseAuthors,
		};
		setCourses([...props.courses, course]);
		props.setShow(isSetShow);
	}
	return (
		<div className='create-course-wrapper'>
			<div className='create-course-header-wrapper'>
				<Input
					description='Title'
					placeholder='Enter title...'
					titleRef={titleRef}
				/>
				<Button setShow={createCourse} value='Create course' />
			</div>
			<div className='create-course-desc-wrapper'>
				<textarea
					name='desc'
					className='desc'
					placeholder='Enter description'
					ref={descriptionRef}
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
							nameRef={nameRef}
						/>
						<Button createAuthor={createAuthor} value='Create author' />
					</div>
					<div className='duration-wrapper'>
						<span className='duration-title'>
							<b>Duration</b>
						</span>
						<Input
							description='Duration'
							placeholder='Enter duration in minutes...'
							setInputValue={setInputValue}
							durationRef={durationRef}
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
							{props.authors.map((author) => {
								return (
									<div className='author-item'>
										<li key={author.id}>{author.name}</li>
										<Button
											value='Add author'
											addAuthor={addAuthor}
											author={author}
										/>
									</div>
								);
							})}
						</ul>
					</div>
					<div className='course-authors'>
						<span>Authors</span>
						{!courseAuthors.length && <span>Authors list is empty</span>}
						{courseAuthors.map((author) => {
							return (
								<div className='author-item'>
									<li key={author.id}>{author.name}</li>
									<Button
										value='Delete author'
										deleteAuthor={deleteAuthor}
										author={author}
									/>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CreateCourse;
