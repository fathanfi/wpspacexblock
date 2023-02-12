/**
 * External dependencies
 */
import React from 'react';
/**
 * Internal dependencies
 */
import Input from './partials/input';

const SearchBox = ( { value, onChange } ) => {
	return (
		<Input
			type="text"
			placeholder="Search ..."
			name="search_field"
			className="form-control"
			value={ value }
			onChange={ ( e ) => onChange( e.currentTarget.value ) }
		/>
	);
};

export default SearchBox;
