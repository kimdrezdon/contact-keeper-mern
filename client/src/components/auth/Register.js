import React, { useContext, useState } from 'react';
import AuthContext from '../../context/auth/authContext';

const Register = () => {
	const authContext = useContext(AuthContext);
	const { registerUser } = authContext;

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
		registerUser(user);
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
					/>
				</div>
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
				<div className='form-group'>
					<label htmlFor='password2'>Confirm Password</label>
					<input
						type='text'
						name='password2'
						value={password2}
						onChange={onChange}
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
