<?php
/**
 * Plugin Name:       Spacex Grid Block
 * Description:       Block rendering a card with spacex external API data information.
 * Requires at least: 6.0
 * Requires PHP:      8.0
 * Version:           1.0.0
 * Author:            Fathan Fisabililah
 * Author URI:        https://github.com/fathanfi
 * Text Domain:       wp-spacex-block
 *
 * @package           SpacexBlock
 */

namespace FFI\SpacexBlock;

const MAIN_FILE = __FILE__;
const MAIN_DIR  = __DIR__;

require MAIN_DIR . '/vendor/autoload.php';

/**
 * Initialize modules
 */
Modules\Block\Block::register();
