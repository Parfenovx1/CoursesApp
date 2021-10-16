import './CourseCard.css';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { deleteCourse } from '../../store/courses/actionCreators';

function CourseCard(props) {
	let history = useHistory();
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
	function deleteCourse(id = props.id) {
		props.deleteCourse(id);
	}
	return (
		<div className='course-card-wrapper'>
			<div className='leftside'>
				<h1 className='course-name'>
					<b>{props.title}</b>
				</h1>
				<p className='course-decs'>{props.description}</p>
			</div>
			<div className='rightside'>
				<p>
					<b>Authors: </b>
					{props.authors.map((author, index) => {
						if (index + 1 !== props.authors.length) {
							return <span key={index}>{author}, </span>;
						}
						return <span key={index}>{author} </span>;
					})}
				</p>
				<p>
					<b>Duration: </b> {getTimeFromMins(props.duration)} hours
				</p>
				<p>
					<b>Created: </b> {props.creationDate}
				</p>
				<div className='buttons-wrapper'>
					<Button
						handler={() => {
							history.push(`/courses/${props.id}`);
						}}
						value='Show course'
					></Button>
					<Button value='Update course' />
					<Button handler={deleteCourse} value='Delete course' />
				</div>
			</div>
		</div>
	);
}

CourseCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	creationDate: PropTypes.string.isRequired,
	duration: PropTypes.number.isRequired,
	authors: PropTypes.array.isRequired,
	deleteCourse: PropTypes.func.isRequired,
};

const mapActionsToProps = {
	deleteCourse: deleteCourse,
};

export default connect(null, mapActionsToProps)(CourseCard);
