import urllib.request
import ssl
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request('https://pakwoodfurniture.store/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx, timeout=10) as res:
    html = res.read().decode('utf-8')

print("Asset tags found:")
for line in html.split('\n'):
    if 'script' in line or 'stylesheet' in line:
        print(" ", line.strip())

# Check each asset URL
asset_urls = re.findall(r'(?:src|href)="\./(assets/[^"]+)"', html)
print("\nResolving assets:")
for asset in asset_urls:
    full_url = f"https://pakwoodfurniture.store/{asset}"
    try:
        a_req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(a_req, context=ctx, timeout=10) as a_res:
            content = a_res.read()
            print(f"  {full_url} -> Status {a_res.status}, {len(content)} bytes")
    except Exception as e:
        print(f"  {full_url} -> FAILED: {e}")
