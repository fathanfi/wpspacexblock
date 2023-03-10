/**
 * External dependencies
 */
import _ from 'lodash';
/**
 * WordPress dependencies
 */
import { render, useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
/**
 * Internal dependencies
 */
import SearchBox from './components/common/searchBox';
import PostsGrid from './components/postsGrid';
import Pagination from './components/common/pagination';
import { paginate } from './utils/paginate';

function DataPostGrid( props ) {
	const [ searchQuery, setSearchQuery ] = useState( '' );
	const [ loaded, setLoaded ] = useState( false );
	const [ currentPage, setCurrentPage ] = useState( 1 );
	const [ allPosts ] = useState( props.allPosts );
	const { pageItems } = props;

	//Paginate & Sort
	useEffect( () => {
		if ( allPosts.length !== 0 ) {
			setLoaded( true );
		}
	}, [ allPosts.length ] );

	let filtered = allPosts;
	if ( searchQuery ) {
		filtered = allPosts?.filter( ( post ) =>
			post.mission_name
				.toLowerCase()
				.startsWith( searchQuery.toLowerCase() )
		);
	}

	const sorted = _.orderBy( filtered );
	const userPosts = paginate( sorted, currentPage, pageItems );
	const countPosts = sorted ? (
		sorted.length
	) : (
		<div className="spinner-border text-primary" role="status">
			<span className="visually-hidden">Loading...</span>
		</div>
	);

	//Handlers
	const handleSearch = ( query ) => {
		setSearchQuery( query );
		setCurrentPage( 1 );
	};

	const handlePageChange = ( page ) => {
		setCurrentPage( page );
	};

	//Render
	return (
		<div className="row">
			<div className="col">
				{
					loaded &&
					<p>You have { countPosts } posts</p>
				}

				<SearchBox value={ searchQuery } onChange={ handleSearch } />
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
