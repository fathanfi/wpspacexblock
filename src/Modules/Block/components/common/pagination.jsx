/**
 * External dependencies
 */
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ( props ) => {
	const { allItems, pageSize, onPageChange, currentPage } = props;
	const pagesCount = Math.ceil( allItems / pageSize );
	if ( pagesCount === 1 || isNaN( pagesCount ) ) {
		return null;
	}
	const pages = _.range( 1, pagesCount + 1 );

	return (
		<nav aria-label="...">
			<ul className="pagination pagination-sm">
				{ pages.map( ( page ) => {
					return (
						<li
							key={ page }
							className={
								page === currentPage
									? 'page-item active'
									: 'page-item'
							}
						>
							<span
								className="page-link"
								onClick={ () => onPageChange( page ) }
							>
								{ page }
							</span>
						</li>
					);
				} ) }
			</ul>
		</nav>
	);
};
Pagination.propTypes = {
	allItems: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	currentPage: PropTypes.number.isRequired,
};
export default Pagination;
