import './Input.css';

function Input(props) {
	let description = props.description;
	return (
		<div className='input-wrapper'>
			<p>{description}</p>
			<input
				class='input'
				placeholder={props.placeholder}
				type={props.type}
				min={props.min}
				max={props.max}
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

export default Input;
