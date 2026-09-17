#!/usr/bin/env python3
"""Update blog-sitemap.xml by appending missing slugs before </urlset>"""

import re
from pathlib import Path

SITEMAP_PATH = Path("/home/z/my-project/public/blog-sitemap.xml")
BLOG_DATA_PATH = Path("/home/z/my-project/src/lib/blog-data.ts")

# Extract slugs from blog-data.ts
blog_content = BLOG_DATA_PATH.read_text(encoding="utf-8")
blog_slugs = set(re.findall(r'slug:\s*"([a-z0-9-]+)"', blog_content))

# Extract slugs from existing sitemap
sitemap_content = SITEMAP_PATH.read_text(encoding="utf-8")
sitemap_slugs = set(re.findall(r"https://htg\.com\.pk/blog/([a-z0-9-]+)/</loc>", sitemap_content))

# Find missing slugs
missing_slugs = sorted(blog_slugs - sitemap_slugs)

if not missing_slugs:
    print("Sitemap is already up to date.")
    raise SystemExit(0)

# Build new url entries
new_entries = []
for slug in missing_slugs:
    new_entries.append(f"""  <url>
    <loc>https://htg.com.pk/blog/{slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>""")

new_block = "\n".join(new_entries) + "\n"

# Insert before </urlset>
updated_sitemap = sitemap_content.replace(
    "</urlset>",
    new_block + "</urlset>"
)

SITEMAP_PATH.write_text(updated_sitemap, encoding="utf-8")

print(f"Added {len(missing_slugs)} new slugs to sitemap:")
for slug in missing_slugs:
    print(f"  - {slug}")
