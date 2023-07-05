# Use the official PHP image as the base image
FROM php:latest

# Set the working directory inside the container
WORKDIR /var/www/html

# Install the MySQL client library and PDO MySQL extension
RUN apt-get update && apt-get install -y default-mysql-client default-libmysqlclient-dev \
    && docker-php-ext-install pdo pdo_mysql

# Copy the application files to the container
COPY . /var/www/html

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install application dependencies using Composer
RUN composer install --no-dev --optimize-autoloader

# Expose the port on which the application will run
EXPOSE 80

# Start the PHP built-in web server
CMD php -S 0.0.0.0:80 -t .
