/**
 * External dependencies
 */
import _ from 'lodash';

export function paginate( allItems, pageNumber, pageSize ) {
	const startIndex = ( pageNumber - 1 ) * pageSize;
	return _( allItems ).slice( startIndex ).take( pageSize ).value();
}
