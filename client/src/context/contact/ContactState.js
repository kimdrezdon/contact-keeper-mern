import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACT_ERROR,
	GET_CONTACTS,
	CLEAR_CONTACTS
} from '../types';

const ContactState = props => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null
	};

	// State allows us to access anything in our state and dispatch allows us to dispatch objects to the reducer
	const [state, dispatch] = useReducer(contactReducer, initialState);

	// Get Contacts
	const getContacts = async () => {
		try {
			// Send get request to back-end with add contact form data in the req.body
			const res = await axios.get('/api/contacts');
			// Response will be the contacts from back-end
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			// Response will be error message from back-end
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Add Contact
	const addContact = async contact => {
		// Add header to request (user's token already saved to global state with setAuthToken in utils)
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			// Send post request to back-end with add contact form data in the req.body
			const res = await axios.post('/api/contacts', contact, config);
			// Response will be the contact from back-end
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			// Response will be error message from back-end
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Delete Contact
	const deleteContact = async id => {
		try {
			// Send delete request to back-end with id in the route
			await axios.delete(`/api/contacts/${id}`);
			// Response will be the deletion message from back-end
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (err) {
			// Response will be error message from back-end
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Set Current Contact
	const setCurrent = contact => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Update Contact
	const updateContact = async contact => {
		// Add header to request (user's token already saved to global state with setAuthToken in utils)
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		try {
			// Send put request to back-end with contact form data in the req.body
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			// Response will be the contact from back-end
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (err) {
			// Response will be error message from back-end
			dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
		}
	};

	// Filter Contacts
	const filterContacts = search => {
		dispatch({ type: FILTER_CONTACTS, payload: search });
	};

	// Clear Filter
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	// Clear contacts
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearContacts
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
