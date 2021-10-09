import './Search.css';
import Button from '../Button/Button';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Search(props) {
	const [searchValue, setSearchValue] = useState('');
	return (
		<div className='search-wrapper'>
			<input
				className='search'
				type='search'
				name='search'
				placeholder={props.placeholder}
				onChange={(event) => {
					if (event.target.value === '') {
						props.setValue(event.target.value);
						event.target.nextSibling.disabled = true;
					} else {
						setSearchValue(event.target.value);
						event.target.nextSibling.disabled = false;
					}
				}}
			/>
			<Button value='Search' handler={() => props.setValue(searchValue)} />
		</div>
	);
}

Search.propsTypes = {
	setValue: PropTypes.func.isRequired,
	placeholder: PropTypes.string.isRequired,
};

export default Search;
