<?php
/**
 * Interface dedicated for Modules
 *
 * @package SpacexBlock
 */

namespace FFI\SpacexBlock\Interfaces;

/**
 * Module interface
 */
interface Module {
	/**
	 * Register module hooks and filters
	 *
	 * @return void
	 */
	public static function register(): void;
}
