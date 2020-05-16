import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
	const contactContext = useContext(ContactContext);
	const { filterContacts, clearFilter, filtered } = contactContext;

	// Ref for filter input field
	const text = useRef('');

	// Clear input field if filtering not being used, ie: filtered is null
	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	// If input field is not blank, filter contacts. Else clear filter.
	const onChange = e => {
		// Uses ref instead of e.target.value
		if (text.current.value !== '') {
			filterContacts(text.current.value);
		} else {
			clearFilter();
		}
	};

	return (
		<form onSubmit={e => e.preventDefault()}>
			<input
				ref={text}
				type='text'
				placeholder='Filter contacts...'
				onChange={onChange}
			/>
		</form>
	);
};

export default ContactFilter;
