import React, { useState } from 'react';
import './CreateCourse.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import * as courseActionCreators from '../../store/courses/actionCreators';
import * as authorActionCreators from '../../store/authors/actionCreators';
import * as userActionCreators from '../../store/user/actionCreators';
function CreateCourse(props) {
	const [inputValue, setInputValue] = useState();
	let [courseAuthors, setCourseAuthors] = useState([]);
	const history = useHistory();
	let course = { authors: [] };

	let nameRef = React.createRef();
	let titleRef = React.createRef();
	let descriptionRef = React.createRef();
	let durationRef = React.createRef();

	function isBlank(str) {
		return !str || /^\s*$/.test(str);
	}

	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return (
			(hours < 10 ? '0' : '') +
			hours +
			':' +
			(minutes < 10 ? '0' : '') +
			minutes
		);
	}

	function addAuthor(author) {
		setCourseAuthors([...courseAuthors, author]);
	}

	function createAuthor() {
		if (!isBlank(nameRef.current.value)) {
			const author = {
				name: nameRef.current.value,
			};
			props
				.createAuthor(author)
				.then(() => {
					nameRef.current.value = ''; //!!!!!!!!!!!
				})
				.catch((error) => console.log(error.message));
		} else {
			alert('Please, fill in author name field');
		}
	}

	function deleteAuthor(author) {
		courseAuthors = courseAuthors.filter((courseAuthor) => {
			return courseAuthor.id !== author.id;
		});
		setCourseAuthors(courseAuthors);
	}

	function createCourse() {
		if (
			!isBlank(titleRef.current.value) &&
			!isBlank(descriptionRef.current.value) &&
			!isBlank(durationRef.current.value) &&
			durationRef.current.value > 0 &&
			courseAuthors.length > 0
		) {
			course = {
				title: titleRef.current.value,
				description: descriptionRef.current.value,
				duration: Number(durationRef.current.value),
				authors: courseAuthors.map((author) => author.id),
			};
			props
				.addCourse(course)
				.then((response) => {
					history.push('/courses');
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (durationRef.current.value < 0) {
			alert('Please, fill in valid amount of hours');
		} else {
			alert('Please, fill in all fields');
		}
	}
	return (
		<div className='create-course-wrapper'>
			<div className='create-course-header-wrapper'>
				<Input
					description='Title'
					placeholder='Enter title...'
					reference={titleRef}
					type='text'
				/>
				<Button handler={createCourse} value='Create course' />
			</div>
			<div className='create-course-desc-wrapper'>
				<textarea
					name='desc'
					className='desc'
					placeholder='Enter description'
					ref={descriptionRef}
				/>
			</div>
			<div className='create-course-main-wrapper'>
				<div className='leftside'>
					<div className='add-author-wrapper'>
						<span className='add-author-title'>Add author</span>
						<Input
							description='Author name'
							placeholder='Enter author name...'
							reference={nameRef}
							type='text'
						/>
						<Button handler={createAuthor} value='Create author' />
					</div>
					<div className='duration-wrapper'>
						<span className='duration-title'>Duration</span>
						<Input
							description='Duration'
							placeholder='Enter duration in minutes...'
							handler={setInputValue}
							reference={durationRef}
							type='number'
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
							{props.authors
								.filter((author) => !courseAuthors.includes(author))
								.map((author) => {
									return (
										<div className='author-item'>
											<li key={author.id}>{author.name}</li>
											<Button
												value='Add author'
												handler={() => addAuthor(author)}
											/>
										</div>
									);
								})}
						</ul>
					</div>
					<div className='course-authors-list'>
						<span>Course Authors</span>
						<ul>
							{!courseAuthors.length && <span>Authors list is empty</span>}
							{courseAuthors.map((author) => {
								return (
									<div className='author-item'>
										<li key={author.id}>{author.name}</li>
										<Button
											value='Delete author'
											handler={() => deleteAuthor(author)}
										/>
									</div>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

CreateCourse.propTypes = {
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	return { authors: state.authors, courses: state.courseReducer };
}

const mapActionsToProps = {
	addCourse: courseActionCreators.addCourse,
	createAuthor: authorActionCreators.createAuthor,
	me: userActionCreators.me,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateCourse);
