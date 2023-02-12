<?php
/**
 * Register custom block
 *
 * @package SpacexBlock
 */

namespace FFI\SpacexBlock\Modules\Block;

use \FFI\SpacexBlock\Interfaces\Module;
use const \FFI\SpacexBlock\MAIN_DIR;

/**
 * Block module
 */
final class Block implements Module {
	/**
	 * Register hooks
	 *
	 * @return void
	 */
	public static function register() : void {
		add_action( 'init', [ get_class(), 'register_block' ] );
		add_action(
			'rest_api_init',
			function () {
				register_rest_route(
					'brainstorm/v1/',
					'/spacexproxy/',
					array(
						'methods'             => 'GET',
						'callback'            => [ get_class(), 'proxy_spacex_oembed' ],
						'permission_callback' => [ get_class(), 'proxy_spacex_oembed_security' ],
					)
				);
			}
		);
	}

	/**
	 * Register block
	 */
	public static function register_block() : void {
		register_block_type(
			MAIN_DIR . '/build/Modules/Block',
			[
				'render_callback' => [ get_class(), 'grid_init_cb' ],
			]
		);
	}

	/**
	 * Check if a user is permitted to fetch the data.
	 *
	 * @return bool Whether user is a Admin/Editor.
	 */
	public static function proxy_spacex_oembed_security() : bool {
		return true;
		return current_user_can( 'manage_options' );
	}

	/**
	 * Proxy the rest api from spacex for better security and solve cors problem.
	 *
	 * @return object via WP_REST responses.
	 */
	public static function proxy_spacex_oembed() : object {
		$api_url = 'https://api.spacexdata.com/v3/launches?limit=20&offset=5';
		// $api_url = 'https://api.spacexdata.com/v3/rockets';
		$da_response = wp_remote_get( $api_url );

		if ( empty( $da_response ) || 200 !== $da_response['response']['code'] ) {
			return new WP_Error(
				'error',
				__( 'Error in response from Spacex', 'ffi-spacex-block' ),
				[
					'response' => $da_response,
				]
			);
		}

		return new \WP_REST_Response( json_decode( $da_response['body'] ) );
	}

	/**
	 * Outputs Block Grid via html imput.
	 *
	 * @param array $atts Array of arguments to be passed to.
	 * @return string Block grid template/content.
	 */
	public static function grid_init_cb( $atts ) : string {
		if ( ! is_user_logged_in() ) {
			return sprintf(
				// Translators: %1$s login url.
				__( 'Spacex Data is only for logged-in user. Please login here <a href=%1$s>clicking here</a>.', 'ffi-spacex-block' ),
				wp_login_url()
			);
		}

		$userID = get_current_user_id();
		ob_start();
		?>
	<div 
		class="wp-block-spacex-grid"
		id="wp-spacex-grid" 
		data-page-items="<?php echo $atts['pageItems']; ?>"
		>
	</div>

		<?php
		$output = ob_get_contents();
		ob_end_clean();

		return $output;
	}
}
