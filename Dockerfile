# ================================
# Stage 1: Node - Build frontend assets
# ================================
FROM node:20-alpine AS node-builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --frozen-lockfile 2>/dev/null || npm install

COPY . .

RUN npm run build

# ================================
# Stage 2: PHP - App
# ================================
FROM php:8.3-fpm-alpine AS base

# Install system dependencies (minimal)
RUN apk add --no-cache \
    bash \
    curl \
    git \
    unzip \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    oniguruma-dev \
    postgresql-dev \
    icu-dev \
    shadow

# Install PHP extensions
RUN docker-php-ext-configure gd --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo \
        pdo_pgsql \
        pgsql \
        gd \
        zip \
        mbstring \
        bcmath \
        opcache \
        intl

# Install Composer
COPY --from=composer:2.7 /usr/bin/composer /usr/bin/composer

# Create non-root user
RUN addgroup -g 1000 -S laravel && adduser -u 1000 -S laravel -G laravel

WORKDIR /var/www/html

# ================================
# Stage 3: Development
# ================================
FROM base AS development

COPY docker/php/php-dev.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

COPY --chown=laravel:laravel composer.json composer.lock* ./
RUN composer install --no-scripts --no-autoloader --prefer-dist

COPY --chown=laravel:laravel . .

COPY --from=node-builder --chown=laravel:laravel /app/public/build ./public/build

RUN composer dump-autoload --optimize

RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views storage/framework/testing bootstrap/cache \
    && chown -R laravel:laravel storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

USER laravel

EXPOSE 9000
CMD ["php-fpm"]

# ================================
# Stage 4: Production
# ================================
FROM base AS production

COPY docker/php/php-prod.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/php/php-fpm.conf /usr/local/etc/php-fpm.d/zz-custom.conf

COPY --chown=laravel:laravel composer.json composer.lock* ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --optimize-autoloader

COPY --chown=laravel:laravel . .

COPY --from=node-builder --chown=laravel:laravel /app/public/build ./public/build

RUN composer dump-autoload --optimize --classmap-authoritative

RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views storage/framework/testing bootstrap/cache \
    && chown -R laravel:laravel storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

COPY --chown=laravel:laravel docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

USER laravel

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["php-fpm"]
