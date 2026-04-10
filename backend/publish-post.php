<?php
/**
 * CLI helper to publish posts to WordPress.
 *
 * Usage: php publish-post.php --title "..." --content "..." --excerpt "..." --category "..." --tags "..." --related-posts "slug1,slug2" --references '[{"title":"...","url":"..."}]'
 */
require_once __DIR__ . '/wp-load.php';
wp_set_current_user(1);

// Parse CLI arguments
$opts = getopt('', ['title:', 'content:', 'excerpt:', 'category:', 'tags:', 'date:', 'related-posts:', 'references:']);

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

// Set tags if provided (comma-separated)
if (!empty($opts['tags'])) {
    $tag_names = array_map('trim', explode(',', $opts['tags']));
    wp_set_post_tags($id, $tag_names);
}

// Set related posts if provided (comma-separated slugs → resolved to IDs)
$related_warnings = [];
if (!empty($opts['related-posts'])) {
    $slugs = array_map('trim', explode(',', $opts['related-posts']));
    $related_ids = [];
    foreach ($slugs as $slug) {
        $posts = get_posts(['name' => $slug, 'post_type' => 'post', 'numberposts' => 1]);
        if (!empty($posts)) {
            $related_ids[] = $posts[0]->ID;
        } else {
            $related_warnings[] = $slug;
        }
    }
    if (!empty($related_ids)) {
        update_post_meta($id, 'related_posts', $related_ids);
    }
}

// Set references if provided (JSON string)
if (!empty($opts['references'])) {
    $refs = json_decode($opts['references'], true);
    if (is_array($refs)) {
        update_post_meta($id, 'references', $refs);
    }
}

$output = [
    'id' => $id,
    'title' => $opts['title'],
    'slug' => get_post($id)->post_name,
    'category' => $cat_name,
    'tags' => $opts['tags'] ?? '',
    'url' => get_permalink($id),
];

if (!empty($related_warnings)) {
    $output['warnings'] = 'Unresolved slugs: ' . implode(', ', $related_warnings);
}

echo json_encode($output);
