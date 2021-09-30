import './CourseCard.css';
import Button from '../Button/Button';

function CourseCard(props) {
	function getTimeFromMins(mins) {
		let hours = Math.trunc(mins / 60);
		let minutes = mins % 60;
		return hours + ':' + minutes;
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
							return <span>{author}, </span>;
						}
						return <span>{author} </span>;
					})}
				</p>
				<p>
					<b>Duration: </b> {getTimeFromMins(props.duration)}
				</p>
				<p>
					<b>Created: </b> {props.creationDate}
				</p>
				<Button value='Show course' />
			</div>
		</div>
	);
}

export default CourseCard;
