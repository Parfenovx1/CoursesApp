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
				ref={props.durationRef}
				onChange={(event) => {
					props.setInputValue(event.target.value);
				}}
			/>
		</div>
	) : description === 'Author name' ? (
		<div className='input-wrapper'>
			<p>{description}</p>
			<input
				id='input'
				placeholder={props.placeholder}
				type='text'
				ref={props.nameRef}
			/>
		</div>
	) : description === 'Title' ? (
		<div className='input-wrapper'>
			<p>{description}</p>
			<input
				id='input'
				placeholder={props.placeholder}
				type='text'
				ref={props.titleRef}
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
