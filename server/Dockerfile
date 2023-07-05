# Use the official PHP image as the base image
FROM php:8.1-apache

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the PHP application files to the container
COPY . /var/www/html

# Install required dependencies
RUN apt-get update \
    && apt-get install -y libzip-dev zip \
    && docker-php-ext-install zip \
    && docker-php-ext-enable opcache

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --prefer-dist

# Expose port 80
EXPOSE 80
