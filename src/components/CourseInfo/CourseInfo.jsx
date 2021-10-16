import './CourseInfo.css';
import Button from '../Button/Button';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCourse } from '../../store/courses/actionCreators';

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
	let { id } = useParams();
	useEffect(() => {
		props.getCourse(id).then((response) => {
			setCourse(response);
		});
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
								if (index + 1 !== course.authors.length) {
									return <span key={index}>{author.name}, </span>;
								}
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
	courses: PropTypes.array.isRequired,
	getCourse: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return { courses: state.courses, authors: state.authors };
}

const mapActionsToProps = {
	getCourse: getCourse,
};

export default connect(mapStateToProps, mapActionsToProps)(CourseInfo);
