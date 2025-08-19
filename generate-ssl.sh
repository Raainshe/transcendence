#!/bin/bash

# Create SSL directory if it doesn't exist
mkdir -p nginx/ssl

# Generate self-signed SSL certificate for development
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout nginx/ssl/transcendence.key \
    -out nginx/ssl/transcendence.crt \
    -subj "/C=US/ST=State/L=City/O=Organization/OU=OrgUnit/CN=localhost"

# Set appropriate permissions
chmod 600 nginx/ssl/transcendence.key
chmod 644 nginx/ssl/transcendence.crt

echo "SSL certificates generated successfully!"
echo "Key: nginx/ssl/transcendence.key"
echo "Certificate: nginx/ssl/transcendence.crt"
