import './Button.css';

function Button(props) {
	let value = props.value;
	return (
		<button onClick={() => props.handler()} className='button'>
			{value}
		</button>
	);
}

export default Button;
