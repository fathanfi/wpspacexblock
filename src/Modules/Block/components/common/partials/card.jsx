/**
 * External dependencies
 */
import React, { Component } from 'react';
/**
 * WordPress dependencies
 */
import _ from 'lodash';
import { __ } from '@wordpress/i18n';
import 'bootstrap/dist/css/bootstrap.css';

class GridList extends Component {
	render() {
		const { items, itemsCount, itemsLoaded } = this.props;

		return (
			<section>
				<div className="grid">
					{ itemsLoaded && itemsCount === 0 && (
						<p className="lead">
							{ __( 'There is no post here.', 'wp-spacex-block' ) }
						</p>
					) }
					{ itemsLoaded &&
						items?.map( ( item ) => (
							<>
								<div className="grid__item">
									<div className="card">
										<img
											className="card__img"
											src={ item.links.mission_patch_small }
											alt="Canyons"
										></img>
										<div className="card__content">
											<div className="card__year">
												{ item.launch_year }
											</div>
											<h3 className="card__header">
												{ item.mission_name }
											</h3>
											<p className="card__text">
												{
													item.launch_site
														.site_name_long
												}
											</p>
											<button className="card__btn">
												Explore <span>&rarr;</span>
											</button>
										</div>
									</div>
								</div>
							</>
						) ) }
				</div>
			</section>
		);
	}
}

export default GridList;
