import './CourseInfo.css';
import Button from '../Button/Button';
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

function CourseInfo(props) {
	let [course, setCourse] = useState({ authors: [] });
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
	let history = useHistory();
	let location = useLocation();
	let s = location.pathname;
	useEffect(() => {
		let id = s.split('/').pop();
		const fetchCoursesData = async () => {
			const response = await axios.get(`http://localhost:3000/courses/${id}`);

			setCourse(response.data.result);
		};
		fetchCoursesData();
	}, []);
	return (
		<div className='course-info-wrapper'>
			<div className='back-to-courses-wrapper'>
				<Button
					handler={() => {
						history.push('/courses');
					}}
					value='Back to courses'
				/>
			</div>
			<h1>{course.title}</h1>
			<div className='course-info'>
				<div className='leftside'>{course.description}</div>
				<div className='rightside'>
					<p>
						<b>ID: </b> {course.id}
					</p>
					<p>
						<b>Duration: </b> {getTimeFromMins(course.duration)} hours
					</p>
					<p>
						<b>Created: </b> {course.creationDate}
					</p>
					<p>
						<b>Authors: </b>
						{course.authors
							.map((courseAuthor) =>
								props.authors.find((author) => author.id === courseAuthor)
							)
							.filter((author) => !!author)
							.map((author, index) => {
								return <span key={index}>{author.name} </span>;
							})}
					</p>
				</div>
			</div>
		</div>
	);
}

CourseInfo.propTypes = {
	authors: PropTypes.array.isRequired,
};

export default CourseInfo;
