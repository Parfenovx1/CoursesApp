import './Header.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';

function Header() {
	let [user, setUser] = useState({});
	let [login, setLogin] = useState(false);
	const history = useHistory();
	useEffect(() => {
		const token = localStorage.getItem('token');

		const fetchUserData = async () => {
			const response = await axios.get('http://localhost:3000/users/me', {
				headers: {
					Authorization: token,
				},
			});
			setLogin(true);
			setUser(response.data.result);
		};
		fetchUserData();
	}, []);
	const submitHandler = function () {
		const token = localStorage.getItem('token');
		axios
			.delete('http://localhost:3000/logout', {
				headers: {
					Authorization: token,
				},
			})
			.then((response) => {
				localStorage.removeItem('token');
				history.push('/login');
				history.go(0);
			});
	};
	return (
		<div className='header-wrapper'>
			<Logo />
			<div className='user-and-button'>
				<p className='user-name'>{user.name ? user.name : user.email}</p>
				{login ? <Button handler={submitHandler} value='Logout' /> : null}
			</div>
		</div>
	);
}

export default Header;
