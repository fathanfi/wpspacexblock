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
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate';

function DataPostGrid( props ) {
	const [ loaded ] = useState( true );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ allPosts ] = useState( props.allPosts );
	const { pageItems } = props;

	//Paginate & Sort
	let filtered = allPosts;

	const sorted = _.orderBy( filtered );
	const userPosts = paginate( sorted, currentPage, pageItems );
	const countPosts = sorted ? (
		sorted.length
	) : (
		<div className="spinner-border text-primary" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);

	const handlePageChange = ( page ) => {
		setCurrentPage( page );
	};

	//Render
	return (
		<div className="row">
			<div className="col">
				{ loaded && <p>You have { countPosts } posts</p> }

				<PostsGrid
					items={ userPosts }
					itemsCount={ countPosts }
					itemsLoaded={ loaded }
				/>
				<Pagination
					currentPage={ currentPage }
					allItems={ countPosts }
					pageSize={ pageItems }
					onPageChange={ handlePageChange }
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
