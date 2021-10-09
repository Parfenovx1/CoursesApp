import './Button.css';
import PropTypes from 'prop-types';

function Button(props) {
	let value = props.value;
	return (
		<button
			type={props.type}
			onClick={props.handler ? () => props.handler() : null}
			className='button'
		>
			{value}
		</button>
	);
}

Button.defaultProps = {
	type: 'button',
};

Button.propTypes = {
	value: PropTypes.string.isRequired,
	handler: PropTypes.func,
	type: PropTypes.string,
};

export default Button;
