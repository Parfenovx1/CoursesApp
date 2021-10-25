import React, { useState, useEffect } from 'react';
import './CourseForm.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router';
import { connect } from 'react-redux';
import * as courseActionCreators from '../../store/courses/actionCreators';
import * as authorActionCreators from '../../store/authors/actionCreators';
import * as userActionCreators from '../../store/user/actionCreators';
function CourseForm(props) {
	const history = useHistory();
	let [author, setAuthor] = useState({ name: '' });
	let [course, setCourse] = useState({
		title: '',
		description: '',
		duration: 0,
		authors: [],
	});
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

	function handleCourseOnChange(event) {
		setCourse({ ...course, ...{ [event.target.name]: event.target.value } });
	}

	function handleAuthorOnChange(event) {
		setAuthor({ ...author, ...{ [event.target.name]: event.target.value } });
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
	let { id } = useParams();
	useEffect(() => {
		props.getCourse(id).then((response) => {
			setCourse(response);
			console.log(course);
		});
	}, []);
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
	return id ? (
		<form onSubmit={UpdateCourse}>
			<div className='create-course-wrapper'>
				<div className='create-course-header-wrapper'>
					<Input
						description='Title'
						placeholder={course.title}
						type='text'
						handler={handleCourseOnChange}
						name='title'
					/>
					<Button type='submit' value='Update course' />
				</div>
				<div className='create-course-desc-wrapper'>
					<textarea
						name='description'
						className='desc'
						placeholder={course.description}
						onChange={handleCourseOnChange}
					/>
				</div>
				<div className='create-course-main-wrapper'>
					<div className='leftside'>
						<div className='add-author-wrapper'>
							<span className='add-author-title'>Add author</span>
							<Input
								description='Author name'
								placeholder='Enter author name...'
								handler={handleAuthorOnChange}
								type='text'
								name='name'
							/>
							<Button handler={createAuthor} value='Create author' />
						</div>
						<div className='duration-wrapper'>
							<span className='duration-title'>Duration</span>
							<Input
								description='Duration'
								placeholder={getTimeFromMins(course.duration)}
								type='number'
								handler={handleCourseOnChange}
								name='duration'
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
							<ul>
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
							<ul>
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
	) : (
		<form onSubmit={CreateCourse}>
			<div className='create-course-wrapper'>
				<div className='create-course-header-wrapper'>
					<Input
						description='Title'
						placeholder='Enter title...'
						type='text'
						handler={handleCourseOnChange}
						name='title'
					/>
					<Button type='submit' value='Create course' />
				</div>
				<div className='create-course-desc-wrapper'>
					<textarea
						name='description'
						className='desc'
						placeholder='Enter description'
						onChange={handleCourseOnChange}
					/>
				</div>
				<div className='create-course-main-wrapper'>
					<div className='leftside'>
						<div className='add-author-wrapper'>
							<span className='add-author-title'>Add author</span>
							<Input
								description='Author name'
								placeholder='Enter author name...'
								handler={handleAuthorOnChange}
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
								handler={handleCourseOnChange}
								name='duration'
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
							<ul>
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
							<ul>
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
