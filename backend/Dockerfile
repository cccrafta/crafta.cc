FROM wordpress:php8.2-apache

# Install WP-CLI
RUN curl -o /usr/local/bin/wp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar \
    && chmod +x /usr/local/bin/wp

# Cloud Run sends traffic on $PORT (default 8080), Apache listens on 80 by default
RUN sed -i 's/^Listen 80$/Listen ${PORT}/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/' /etc/apache2/sites-enabled/000-default.conf

# Copy custom files only (WP core comes from base image)
COPY wp-config.php /var/www/html/wp-config.php
COPY wp-content/mu-plugins/ /var/www/html/wp-content/mu-plugins/
COPY publish-post.php /var/www/html/publish-post.php

# Ensure uploads dir exists with correct permissions
RUN mkdir -p /var/www/html/wp-content/uploads \
    && chown -R www-data:www-data /var/www/html/wp-content

EXPOSE 8080
