/**
 * External dependencies
 */
import _ from 'lodash';
/**
 * Wordpress dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useBlockProps } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */
import Pagination from '../../Modules/Block/components/common/pagination';
import { paginate } from '../../Modules/Block/utils/paginate';
import PostsGrid from '../../Modules/Block/components/postsGrid';
import SearchBox from '../../Modules/Block/components/common/searchBox';

export default function Edit( { attributes, setAttributes } ) {
	//Attributes Destructuring
	const { pageItems, currentPage, searchQuery, allPosts } =
		attributes;

	const [ loaded ] = useState( true );

	const urlRequest = `brainstorm/v1/spacexproxy`;

	useEffect( () => {
		async function getSpacexData() {
			try {
				const response = await apiFetch( {
					path: urlRequest,
				} );

				setAttributes( {
					allPosts: response,
				} );
			} catch ( err ) {
				console.log( err );
			}
		}
		getSpacexData();
	} );

	//Paginate & Sort
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
	const handlePageChange = ( page ) => {
		setAttributes( {
			currentPage: page,
		} );
	};

	const handleSearch = ( query ) => {
		setAttributes( {
			searchQuery: query,
			currentPage: 1,
		} );
	};

	//Render
	return (
		<div { ...useBlockProps() }>
			<div className="row">
				<div className="col">
					{ loaded && <p>You have { countPosts } posts</p> }
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
		</div>
	);
}
