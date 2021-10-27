import './Login.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../../store/user/thunk';
import { connect } from 'react-redux';
import { handleOnChange } from '../shared/functions';

function Login(props) {
	const history = useHistory();
	let [login, setLogin] = useState({ email: '', password: '' });
	const submitHandler = function (event) {
		event.preventDefault();
		let obj = {
			email: login.email,
			password: login.password,
		};
		props
			.login(obj)
			.then((response) => {
				history.push('/courses');
			})
			.catch((error) => console.error(error));
	};
	let changeHandler = (event) => handleOnChange(event, setLogin, login);
	return (
		<div className='login-wrapper'>
			<h1 className='login-heading'>Login</h1>
			<form onSubmit={submitHandler}>
				<Input
					name='email'
					placeholder='Enter email'
					description='Email'
					type='text'
					handler={changeHandler}
				/>
				<Input
					name='password'
					placeholder='Enter password'
					description='Password'
					type='password'
					handler={changeHandler}
				/>
				<Button type='submit' value='Login' />
				<p className='registration-link'>
					If you not have an account you can{' '}
					<Link to='/registration'>Register</Link>
				</p>
			</form>
		</div>
	);
}

Login.propTypes = {
	login: PropTypes.func.isRequired,
};

const mapActionsToProps = {
	login: login,
};

export default connect(null, mapActionsToProps)(Login);
