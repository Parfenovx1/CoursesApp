import './Search.css';
import Button from '../Button/Button';
import { useState } from 'react';

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
			<Button
				value='Search'
				searchValue={searchValue}
				setValue={props.setValue}
			/>
		</div>
	);
}

export default Search;
