import json
from datetime import datetime

with open('src/data/products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

today = datetime.now().strftime('%Y-%m-%d')
base_url = "https://pakwoodfurniture.store"

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]

core_pages = [
    ('/', '1.0', 'daily'),
    ('/#/collections', '0.9', 'daily'),
    ('/#/collections?category=sofas', '0.8', 'weekly'),
    ('/#/collections?category=beds', '0.8', 'weekly'),
    ('/#/collections?category=chairs', '0.8', 'weekly'),
    ('/#/collections?category=dining', '0.8', 'weekly'),
    ('/#/collections?category=office', '0.8', 'weekly'),
    ('/#/custom-orders', '0.8', 'monthly'),
    ('/#/about', '0.7', 'monthly'),
    ('/#/contact', '0.7', 'monthly'),
]

for path, priority, freq in core_pages:
    xml_lines.append('  <url>')
    xml_lines.append(f'    <loc>{base_url}{path}</loc>')
    xml_lines.append(f'    <lastmod>{today}</lastmod>')
    xml_lines.append(f'    <changefreq>{freq}</changefreq>')
    xml_lines.append(f'    <priority>{priority}</priority>')
    xml_lines.append('  </url>')

for p in products:
    xml_lines.append('  <url>')
    xml_lines.append(f'    <loc>{base_url}/#/product/{p["slug"]}</loc>')
    xml_lines.append(f'    <lastmod>{today}</lastmod>')
    xml_lines.append(f'    <changefreq>weekly</changefreq>')
    xml_lines.append('    <priority>0.8</priority>')
    xml_lines.append('  </url>')

xml_lines.append('</urlset>')

with open('public/sitemap.xml', 'w', encoding='utf-8') as f:
    f.write('\n'.join(xml_lines))

print("public/sitemap.xml successfully generated!")
