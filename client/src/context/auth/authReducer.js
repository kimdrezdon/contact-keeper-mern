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

export default (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				loading: false
			};
		case AUTH_ERROR:
			// Clear token in local storage
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case REGISTER_SUCCESS:
			// Sets token in local storage
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				// Updates token in state
				...action.payload,
				isAuthenticated: true,
				loading: false
			};
		case REGISTER_FAIL:
			// Clear token in local storage
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};
