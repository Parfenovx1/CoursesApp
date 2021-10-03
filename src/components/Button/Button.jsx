import './Button.css';

function Button(props) {
	let value = props.value;
	return value === 'Search' ? (
		<button
			onClick={() => props.setValue(props.searchValue)}
			className='button'
		>
			{value}
		</button>
	) : value === 'Add new course' ? (
		<button onClick={() => props.setShow(true)} className='button'>
			{value}
		</button>
	) : value === 'Create course' ? (
		<button onClick={() => props.setShow(false)} className='button'>
			{value}
		</button>
	) : value === 'Create author' ? (
		<button onClick={() => props.createAuthor()} className='button'>
			{value}
		</button>
	) : value === 'Add author' ? (
		<button onClick={() => props.addAuthor(props.author)} className='button'>
			{value}
		</button>
	) : value === 'Delete author' ? (
		<button onClick={() => props.deleteAuthor(props.author)} className='button'>
			{value}
		</button>
	) : (
		<button className='button'>{value}</button>
	);
}

export default Button;
