<?php
/**
 * The base configuration for WordPress - Crafta CC
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 * @package WordPress
 */

// Suppress PHP 8.5 deprecation warnings (WordPress core not yet fully compatible)
error_reporting( E_ALL & ~E_DEPRECATED );

// Load .env file
$env_file = __DIR__ . '/../.env';
if ( file_exists( $env_file ) ) {
	foreach ( file( $env_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES ) as $line ) {
		if ( strpos( trim( $line ), '#' ) === 0 ) continue;
		if ( strpos( $line, '=' ) !== false ) {
			putenv( trim( $line ) );
		}
	}
}

// ** Database settings ** //
define( 'DB_NAME', getenv( 'DB_NAME' ) ?: 'crafta_cc' );
define( 'DB_USER', getenv( 'DB_USER' ) ?: 'wordpress' );
define( 'DB_PASSWORD', getenv( 'DB_PASSWORD' ) ?: '' );
define( 'DB_HOST', getenv( 'DB_HOST' ) ?: '127.0.0.1' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

/**
 * Authentication unique keys and salts.
 */
define('AUTH_KEY',         'xK9#mP2$vL7@nQ4!wR6&jT8*cF1^hY3+dA5-bG0=eU');
define('SECURE_AUTH_KEY',  'pN3$kM7!wQ1@rT5#xL9&vF2*jY6^cA8+hG4-dB0=eU');
define('LOGGED_IN_KEY',    'rT5#xL9&vF2*jY6^cA8+hG4-dB0=eU!pN3$kM7@wQ1');
define('NONCE_KEY',        'vF2*jY6^cA8+hG4-dB0=eU!pN3$kM7@wQ1#rT5&xL9');
define('AUTH_SALT',        'jY6^cA8+hG4-dB0=eU!pN3$kM7@wQ1#rT5&xL9*vF2');
define('SECURE_AUTH_SALT', 'cA8+hG4-dB0=eU!pN3$kM7@wQ1#rT5&xL9*vF2^jY6');
define('LOGGED_IN_SALT',   'hG4-dB0=eU!pN3$kM7@wQ1#rT5&xL9*vF2^jY6+cA8');
define('NONCE_SALT',       'dB0=eU!pN3$kM7@wQ1#rT5&xL9*vF2^jY6+cA8-hG4');

/**
 * WordPress database table prefix.
 */
$table_prefix = 'wp_';

/**
 * WordPress debugging mode - enabled for development.
 */
define( 'WP_DEBUG', true );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
