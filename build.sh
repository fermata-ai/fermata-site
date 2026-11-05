#!/bin/sh
# The published copy of the site, in _site. The PostHog key is not in the repo: POSTHOG_KEY goes in place
# of __POSTHOG_KEY__ here. Without it the page still works and simply sends no analytics.
set -e
cd "$(dirname "$0")"
rm -rf _site && mkdir _site
cp -R index.html guide signed-in demo assets CNAME .nojekyll _site/
if [ -n "${POSTHOG_KEY:-}" ]; then
  for page in _site/index.html _site/demo/index.html _site/guide/index.html; do
    sed -i.bak "s/__POSTHOG_KEY__/${POSTHOG_KEY}/" "$page" && rm -f "$page.bak"
  done
else
  echo "::warning::POSTHOG_KEY is not set; the site deploys without analytics"
fi
