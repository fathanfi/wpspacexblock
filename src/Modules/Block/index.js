/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

/**
 * Style dependencies
 */
import './main.scss';

registerBlockType( metadata.name, {
	src: {
		icon: 'smiley',
	},
	edit: Edit,
} );
