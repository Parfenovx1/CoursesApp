import './Registration.css';
import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import React from 'react';
import { useHistory } from 'react-router';
import { register, login } from '../../store/user/thunk';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { handleOnChange } from '../shared/functions';

function Registration(props) {
	const history = useHistory();
	let [registration, setRegistration] = useState({
		name: '',
		email: '',
		password: '',
	});
	const submitHandler = function (event) {
		event.preventDefault();
		let obj = {
			name: registration.name,
			email: registration.email,
			password: registration.password,
		};
		props
			.register(obj)
			.then((response) => {
				let obj = {
					email: registration.email,
					password: registration.password,
				};
				props
					.login(obj)
					.then((response) => {
						history.push('/courses');
					})
					.catch((error) => console.error(error));
			})
			.catch((error) => console.err(error));
	};
	let changeHandler = (event) =>
		handleOnChange(event, setRegistration, registration);
	return (
		<div className='registration-wrapper'>
			<h1 className='registration-heading'>Registration</h1>
			<form onSubmit={submitHandler}>
				<Input
					name='name'
					placeholder='Enter name'
					description='Name'
					type='text'
					handler={changeHandler}
				/>
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
				<Button type='submit' value='Registration' />
				<p className='login-link'>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
}

Registration.propTypes = {
	register: PropTypes.func.isRequired,
};

const mapActionsToProps = {
	register: register,
	login: login,
};

export default connect(null, mapActionsToProps)(Registration);
