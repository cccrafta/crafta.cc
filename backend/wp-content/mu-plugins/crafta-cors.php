<?php
/**
 * CORS headers for Cloud Run — allows Cloudflare Pages frontend to call the REST API.
 */
add_action( 'rest_api_init', function () {
    $origin = getenv( 'CORS_ALLOWED_ORIGIN' ) ?: 'https://crafta.cc';
    header( 'Access-Control-Allow-Origin: ' . $origin );
    header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
    header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
}, 15 );

add_action( 'init', function () {
    if ( $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
        $origin = getenv( 'CORS_ALLOWED_ORIGIN' ) ?: 'https://crafta.cc';
        header( 'Access-Control-Allow-Origin: ' . $origin );
        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
        http_response_code( 204 );
        exit;
    }
} );
