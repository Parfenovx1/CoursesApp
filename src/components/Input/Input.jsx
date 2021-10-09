import './Input.css';
import PropTypes from 'prop-types';

function Input(props) {
	let description = props.description;
	return (
		<div className='input-wrapper'>
			<p>{description}</p>
			<input
				name={props.name ? props.name : ''}
				className='input'
				placeholder={props.placeholder}
				type={props.type}
				ref={props.reference}
				onChange={
					props.handler
						? (event) => {
								props.handler(event.target.value);
						  }
						: null
				}
			/>
		</div>
	);
}

Input.propTypes = {
	placeholder: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	reference: PropTypes.object,
	handler: PropTypes.func,
};

export default Input;
