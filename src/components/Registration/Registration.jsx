import './Registration.css';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React from 'react';
import { useHistory } from 'react-router';

function Registration() {
	const history = useHistory();
	let formRef = React.createRef();
	const submitHandler = function (event) {
		event.preventDefault();
		let obj = {
			name: formRef.current[0].value,
			email: formRef.current[1].value,
			password: formRef.current[2].value,
		};
		axios
			.post('http://localhost:3000/register', obj)
			.then((response) => {
				history.push('/login');
			})
			.catch((error) => console.err(error));
	};
	return (
		<div className='registration-wrapper'>
			<h1 className='registration-heading'>Registration</h1>
			<form ref={formRef} onSubmit={submitHandler}>
				<Input
					name='name'
					placeholder='Enter name'
					description='Name'
					type='text'
				/>
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
				<Button type='submit' value='Registration' />
				<p className='login-link'>
					If you have an account you can <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
}

export default Registration;
