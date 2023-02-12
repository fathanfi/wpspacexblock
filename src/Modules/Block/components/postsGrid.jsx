/**
 * External dependencies
 */
import React, { Component } from 'react';

/**
 * Internal dependencies
 */
import 'bootstrap/dist/css/bootstrap.css';
import Grid from './common/grid';

class PostsGrid extends Component {
	render() {
		const { items, itemsCount, itemsLoaded } = this.props;

		return (
			<Grid
				items={ items }
				itemsCount={ itemsCount }
				itemsLoaded={ itemsLoaded }
			/>
		);
	}
}

export default PostsGrid;
