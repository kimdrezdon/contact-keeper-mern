import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = () => {
	const authContext = useContext(AuthContext);
	const { loginUser } = authContext;

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
		loginUser(user);
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
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='text'
						name='password'
						value={password}
						onChange={onChange}
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
