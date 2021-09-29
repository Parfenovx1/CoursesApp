import './Input.css';

function Input(props) {
	return (
		<input className='search' type='search' placeholder={props.placeholder} />
	);
}

export default Input;
