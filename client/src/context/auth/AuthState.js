import React, { useReducer } from 'react';
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

	// Register User
	const registerUser = user => {
		dispatch({ type: REGISTER_SUCCESS, payload: user });
	};

	// Register Fail

	// User Loaded

	// Auth Error

	// Login Success
	const loginUser = user => {
		dispatch({ type: LOGIN_SUCCESS, payload: user });
	};

	// Login Fail

	// Logout

	// Clear Errors

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				user: state.user,
				loading: state.loading,
				error: state.error,
				registerUser,
				loginUser
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
