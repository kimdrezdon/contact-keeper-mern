import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Login = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { login, isAuthenticated, error, clearErrors } = authContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		// If login successful, redirect to home page
		if (isAuthenticated) {
			props.history.push('/');
		}

		// Checks if received an error back from login() response
		if (error === 'Invalid Credentials') {
			setAlert(error, 'danger');
			clearErrors();
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	// Component level state for form fields
	const [user, setUser] = useState({
		email: '',
		password: ''
	});

	// Destructure user properties
	const { email, password } = user;

	// Update component level state of user as fields are updated
	const onChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	// Login user
	const onSubmit = e => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else {
			login({
				email,
				password
			});
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Login</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='text'
						name='email'
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						value={password}
						onChange={onChange}
						required
					/>
				</div>

				<input
					type='submit'
					value='Login'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Login;
