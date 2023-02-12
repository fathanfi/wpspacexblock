/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import GridList from './partials/card';

const Grid = ( { items, itemsCount, itemsLoaded } ) => {
	return (
		<article>
			<GridList
				items={ items }
				itemsCount={ itemsCount }
				itemsLoaded={ itemsLoaded }
			/>
		</article>
	);
};

export default Grid;
