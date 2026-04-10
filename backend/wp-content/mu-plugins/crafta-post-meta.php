<?php
/**
 * Crafta Journal — Custom Post Meta
 *
 * Registers related_posts and references meta fields
 * exposed via the WordPress REST API.
 */
add_action('init', function () {
    register_post_meta('post', 'related_posts', [
        'show_in_rest' => [
            'schema' => [
                'type'  => 'array',
                'items' => ['type' => 'integer'],
            ],
        ],
        'single'            => true,
        'type'              => 'array',
        'default'           => [],
        'sanitize_callback' => function ($value) {
            return array_map('absint', (array) $value);
        },
    ]);

    register_post_meta('post', 'references', [
        'show_in_rest' => [
            'schema' => [
                'type'  => 'array',
                'items' => [
                    'type'       => 'object',
                    'properties' => [
                        'title' => ['type' => 'string'],
                        'url'   => ['type' => 'string'],
                    ],
                ],
            ],
        ],
        'single'  => true,
        'type'    => 'array',
        'default' => [],
    ]);
});
