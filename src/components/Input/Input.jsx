import './Input.css';

function Input(props) {
	let description = props.description;
	return description === 'Duration' ? (
		<div className='input-wrapper'>
			<p>{description}</p>
			<input
				id='input'
				placeholder={props.placeholder}
				type='number'
				onChange={(event) => {
					props.setInputValue(event.target.value);
				}}
			/>
		</div>
	) : (
		<div className='input-wrapper'>
			<p>{description}</p>
			<input id='input' placeholder={props.placeholder} type='text' />
		</div>
	);
}

export default Input;
