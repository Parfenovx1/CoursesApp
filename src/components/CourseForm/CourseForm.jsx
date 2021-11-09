import React, { useState, useEffect } from 'react';
import './CourseForm.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import { connect } from 'react-redux';
import * as courseActionCreators from '../../store/courses/thunk';
import * as authorActionCreators from '../../store/authors/thunk';
import * as userActionCreators from '../../store/user/thunk';
import { getTimeFromMins, handleOnChange } from '../shared/functions';
function CourseForm(props) {
	const history = useHistory();
	let [author, setAuthor] = useState({ name: '' });
	let [course, setCourse] = useState({
		title: '',
		description: '',
		duration: 0,
		authors: [],
	});
	let { id } = useParams();
	useEffect(() => {
		props.getCourse(id).then((response) => {
			let courseToUpdate = response;
			setCourse({
				...courseToUpdate,
				authors: props.authors.filter((author) =>
					courseToUpdate.authors.includes(author.id)
				),
			});
		});
	}, []);

	function isBlank(str) {
		return !str || /^\s*$/.test(str);
	}

	function addAuthor(author) {
		setCourse({ ...course, ...{ authors: [...course.authors, author] } });
	}

	function createAuthor() {
		if (!isBlank(author.name)) {
			props.createAuthor(author).catch((error) => console.log(error.message));
		} else {
			alert('Please, fill in author name field');
		}
	}

	function deleteAuthor(author) {
		let courseAuthors = course.authors.filter((courseAuthor) => {
			return courseAuthor.id !== author.id;
		});
		setCourse({ ...course, ...{ authors: courseAuthors } });
	}

	function CreateCourse(event) {
		event.preventDefault();
		if (
			!isBlank(course.title) &&
			!isBlank(course.description) &&
			!isBlank(course.duration) &&
			course.duration > 0 &&
			course.authors.length > 0
		) {
			let courseToCreate = {
				...course,
				...{
					authors: course.authors.map((author) => author.id),
					duration: Number(course.duration),
				},
			};
			props
				.addCourse(courseToCreate)
				.then((response) => {
					history.push('/courses');
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (course.duration < 0) {
			alert('Please, fill in valid amount of hours');
		} else {
			alert('Please, fill in all fields');
		}
	}
	function UpdateCourse(event) {
		event.preventDefault();
		if (
			!isBlank(course.title) &&
			!isBlank(course.description) &&
			!isBlank(course.duration) &&
			course.duration > 0 &&
			course.authors.length > 0
		) {
			let courseToUpdate = {
				...course,
				...{
					authors: course.authors.map((author) => author.id),
					duration: Number(course.duration),
				},
			};
			props
				.updateCourse(id, courseToUpdate)
				.then((response) => {
					history.push('/courses');
				})
				.catch((error) => {
					console.log(error);
					console.log(courseToUpdate);
				});
		} else if (course.duration < 0) {
			alert('Please, fill in valid amount of hours');
		} else {
			alert('Please, fill in all fields');
		}
	}
	let courseChangeHandler = (event) => handleOnChange(event, setCourse, course);
	let authorChangeHandler = (event) => handleOnChange(event, setAuthor, author);
	return (
		<form
			onSubmit={id ? UpdateCourse : CreateCourse}
			data-testid='createCourse'
		>
			<div className='create-course-wrapper'>
				<div className='create-course-header-wrapper'>
					<Input
						description='Title'
						placeholder='Enter title...'
						type='text'
						handler={courseChangeHandler}
						name='title'
						value={course.title}
					/>
					<Button
						type='submit'
						value={id ? 'Update course' : 'Create course'}
					/>
				</div>
				<div className='create-course-desc-wrapper'>
					<textarea
						name='description'
						className='desc'
						placeholder='Enter description'
						onChange={courseChangeHandler}
						value={course.description}
					/>
				</div>
				<div className='create-course-main-wrapper'>
					<div className='leftside'>
						<div className='add-author-wrapper'>
							<span className='add-author-title'>Add author</span>
							<Input
								description='Author name'
								placeholder='Enter author name...'
								handler={authorChangeHandler}
								type='text'
								name='name'
							/>
							<Button handler={createAuthor} value='Create author' />
						</div>
						<div className='duration-wrapper'>
							<span className='duration-title'>Duration</span>
							<Input
								description='Duration'
								placeholder='Enter duration in minutes...'
								type='number'
								handler={courseChangeHandler}
								name='duration'
								value={course.duration}
							/>
						</div>
						<p>
							Duration:{' '}
							{course.duration ? getTimeFromMins(course.duration) : '00:00'}{' '}
							hours
						</p>
					</div>
					<div className='rightside'>
						<div className='authors-list'>
							<span>Authors</span>
							<ul data-testid='authorsList'>
								{props.authors
									.filter((author) => !course.authors.includes(author))
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
							<ul data-testid='courseAuthorsList'>
								{!course.authors.length && <span>Authors list is empty</span>}
								{course.authors.map((author) => {
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
		</form>
	);
}

CourseForm.propTypes = {
	courses: PropTypes.array,
	authors: PropTypes.array.isRequired,
	me: PropTypes.func.isRequired,
	createAuthor: PropTypes.func.isRequired,
	addCourse: PropTypes.func.isRequired,
	updateCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return { authors: state.authors, courses: state.course };
}

const mapActionsToProps = {
	addCourse: courseActionCreators.addCourse,
	getCourse: courseActionCreators.getCourse,
	updateCourse: courseActionCreators.updateCourse,
	createAuthor: authorActionCreators.createAuthor,
	me: userActionCreators.me,
};

export default connect(mapStateToProps, mapActionsToProps)(CourseForm);
