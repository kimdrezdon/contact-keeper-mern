import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		user: null,
		loading: true,
		error: null
	};

	// State allows us to access anything in our state and dispatch allows us to dispatch objects to the reducer
	const [state, dispatch] = useReducer(authReducer, initialState);

	//Load User - need to do on each page load to keep the user authenticated because jwt is stateless. Get the user data from the backend and put it into our state
	const loadUser = () => console.log('loaduser');

	// Register User
	const register = async formData => {
		// Add header to request
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			// Send post request to back-end with register form data in the req.body
			const res = await axios.post('/api/users', formData, config);
			// Response will be the jwt token from back-end
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
		} catch (err) {
			// Response will be error message from back-end
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};

	// Login User
	const login = () => console.log('login');

	// Logout
	const logout = () => console.log('logout');

	// Clear Errors
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				loadUser,
				register,
				login,
				logout,
				clearErrors
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
