<?php
/**
 * CLI helper to publish posts to WordPress.
 *
 * Usage: php publish-post.php --title "..." --content "..." --excerpt "..." --category "..." [--date "YYYY-MM-DD"]
 */
require_once __DIR__ . '/wp-load.php';
wp_set_current_user(1);

// Parse CLI arguments
$opts = getopt('', ['title:', 'content:', 'excerpt:', 'category:', 'date:']);

if (empty($opts['title']) || empty($opts['content'])) {
    echo json_encode(['error' => 'Missing required --title or --content']);
    exit(1);
}

// Resolve category
$cat_name = $opts['category'] ?? 'Uncategorised';
$cat = get_term_by('name', $cat_name, 'category');
if (!$cat) {
    $term = wp_insert_term($cat_name, 'category');
    $cat_id = is_wp_error($term) ? 1 : $term['term_id'];
} else {
    $cat_id = $cat->term_id;
}

// Build post data
$post_data = [
    'post_title'    => $opts['title'],
    'post_content'  => $opts['content'],
    'post_excerpt'  => $opts['excerpt'] ?? '',
    'post_status'   => 'publish',
    'post_author'   => 1,
    'post_category' => [$cat_id],
];

if (!empty($opts['date'])) {
    $post_data['post_date'] = date('Y-m-d H:i:s', strtotime($opts['date']));
}

$id = wp_insert_post($post_data);

if (is_wp_error($id)) {
    echo json_encode(['error' => $id->get_error_message()]);
    exit(1);
}

echo json_encode([
    'id' => $id,
    'title' => $opts['title'],
    'slug' => get_post($id)->post_slug ?? sanitize_title($opts['title']),
    'category' => $cat_name,
    'url' => get_permalink($id),
]);
