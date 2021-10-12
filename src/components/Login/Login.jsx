import './Login.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import React from 'react';
import PropTypes from 'prop-types';
import { login } from '../../store/user/actionCreators';
import { connect } from 'react-redux';

function Login(props) {
	const history = useHistory();
	let formRef = React.createRef();

	const submitHandler = function (event) {
		event.preventDefault();
		let obj = {
			email: formRef.current[0].value,
			password: formRef.current[1].value,
		};
		props
			.login(obj)
			.then((response) => {
				history.push('/courses');
			})
			.catch((error) => console.err(error));
	};
	return (
		<div className='login-wrapper'>
			<h1 className='login-heading'>Login</h1>
			<form ref={formRef} onSubmit={submitHandler}>
				<Input
					name='email'
					placeholder='Enter email'
					description='Email'
					type='text'
				/>
				<Input
					name='password'
					placeholder='Enter password'
					description='Password'
					type='password'
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
