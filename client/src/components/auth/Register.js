import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { register, error, clearErrors, isAuthenticated } = authContext;
	const { setAlert } = alertContext;

	useEffect(() => {
		// If registration successful, redirect to home page
		if (isAuthenticated) {
			props.history.push('/');
		}

		// Checks if received an error back from register() response
		if (error === 'User already exists') {
			setAlert(error, 'danger');
			clearErrors();
		}

		// eslint-disable-next-line
	}, [error, isAuthenticated, props.history]);

	// Component level state for form fields
	const [user, setUser] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	// Destructure user properties
	const { name, email, password, password2 } = user;

	// Update component level state of user as fields are updated
	const onChange = e => {
		setUser({
			...user,
			[e.target.name]: e.target.value
		});
	};

	// Register user
	const onSubmit = e => {
		e.preventDefault();
		if (name === '' || email === '' || password === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== password2) {
			setAlert('Passwords must match', 'danger');
		} else {
			register({
				name,
				email,
				password
			});
		}
	};

	return (
		<div className='form-container'>
			<h1>
				Account <span className='text-primary'>Register</span>
			</h1>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						value={name}
						onChange={onChange}
						required
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Email Address</label>
					<input
						type='email'
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
						minLength='6'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='password'
						name='password2'
						value={password2}
						onChange={onChange}
						required
						minLength='6'
					/>
				</div>

				<input
					type='submit'
					value='Register'
					className='btn btn-primary btn-block'
				/>
			</form>
		</div>
	);
};

export default Register;
