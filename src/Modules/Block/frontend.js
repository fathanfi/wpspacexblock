/**
 * External dependencies
 */
import _ from 'lodash';
import { render, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */
import PostsGrid from './components/postsGrid';

function DataPostGrid( props ) {
	const [ loaded ] = useState( true );
	const [ allPosts ] = useState( props.allPosts );
	
	//Render
	return (
		<div className="row">
			<div className="col">
				{ loaded && <p>You have { countPosts } posts</p> }

				<PostsGrid
					items={ allPosts }
					itemsCount={ countPosts }
					itemsLoaded={ loaded }
				/>
			</div>
		</div>
	);
}

document.addEventListener( 'DOMContentLoaded', async () => {
	const block = document.querySelector( '#wp-spacex-grid' );
	const pageItems = parseInt( block.dataset.pageItems );

	const response = await apiFetch( {
		path: `brainstorm/v1/spacexproxy`,
		method: 'GET',
	} );

	render( <DataPostGrid allPosts={ response } pageItems={ pageItems } />, block );
} );
