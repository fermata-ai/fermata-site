#!/bin/sh
# Serve the site locally. With POSTHOG_KEY in .env (gitignored), the preview sends analytics like the
# live site; without it, the page loads with no analytics.
set -e
cd "$(dirname "$0")"
rm -rf _site && mkdir _site
cp -R index.html assets CNAME .nojekyll _site/
key=$(grep -s '^POSTHOG_KEY=' .env | cut -d= -f2 | tr -d '\r\n' || true)
[ -n "$key" ] && sed -i.bak "s/__POSTHOG_KEY__/${key}/" _site/index.html && rm -f _site/index.html.bak
echo "http://127.0.0.1:${PORT:-8000}"
cd _site && exec python3 -m http.server "${PORT:-8000}" --bind 127.0.0.1
