# The landing page on the web machine. Run ./build.sh first. The machine's own Caddy holds the certificates
# and sends getfermata.app here (deploy/web/Caddyfile in fermata-ai/fermata).
FROM caddy:2.11-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY _site /srv/site
