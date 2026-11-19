import urllib.request
import re
import json
import ssl
import os
import io
import time
from PIL import Image
from concurrent.futures import ThreadPoolExecutor

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# Ensure directories
os.makedirs('public/images/sofas', exist_ok=True)
os.makedirs('public/images/beds', exist_ok=True)
os.makedirs('public/images/chairs', exist_ok=True)
os.makedirs('public/images/dining', exist_ok=True)
os.makedirs('public/images/office', exist_ok=True)
os.makedirs('public/images/banners', exist_ok=True)
os.makedirs('src/data', exist_ok=True)

sofas_urls = [
    'https://roco.pk/product/velvet-moss-sofa/',
    'https://roco.pk/product/vero-curve-modular-sofa/',
    'https://roco.pk/product/hemington-chesterfield-leather-sofa/',
    'https://roco.pk/product/summit-u-shape-sectional-sofa/',
    'https://roco.pk/product/cloudrest-white-sectional-sofa/',
    'https://roco.pk/product/lorenzo-square-arm-sofa/',
    'https://roco.pk/product/softera-modular-sofa/',
    'https://roco.pk/product/carter-sofa/',
    'https://roco.pk/product/jade-green-chesterfield-leather-sofa/',
    'https://roco.pk/product/oak-sofa/',
    'https://roco.pk/product/day-bed-sofa/',
    'https://roco.pk/product/kade-outdoor-sectional-sofa/'
]

beds_urls = [
    'https://roco.pk/product/varello-extended-bed-set/',
    'https://roco.pk/product/soreven-archline-bed-set/',
    'https://roco.pk/product/cressa-curve-boucle-bed-set/',
    'https://roco.pk/product/hallowood-bed-set/',
    'https://roco.pk/product/harbor-haven-bedroom-set/',
    'https://roco.pk/product/cambridge-estate-bedroom-set/',
    'https://roco.pk/product/aurela-platform-bed/',
    'https://roco.pk/product/apex-drawer/',
    'https://roco.pk/product/cosmo-dresser/',
    'https://roco.pk/product/hollow-wood-side-table/',
    'https://roco.pk/product/fluted-solid-wood-nightstand/'
]

chairs_urls = [
    'https://roco.pk/product/woodluxe-armchair/',
    'https://roco.pk/product/cloudberry-chair/',
    'https://roco.pk/product/cloudhaven-boucle-chair-with-ottoman/',
    'https://roco.pk/product/harvey-cane-chair/',
    'https://roco.pk/product/eton-chesterfield-chair/',
    'https://roco.pk/product/mathilda-armchair/',
    'https://roco.pk/product/langmere-english-armchair/',
    'https://roco.pk/product/incurve-leatherite-chair/',
    'https://roco.pk/product/zen-recline-armchair/',
    'https://roco.pk/product/umberhush-armchair/'
]

dining_urls = [
    'https://roco.pk/product/monarch-table/',
    'https://roco.pk/product/6-seater-dining-table/',
    'https://roco.pk/product/extendable-dining-set/',
    'https://roco.pk/product/regent-cross-dining-set/',
    'https://roco.pk/product/vista-veneer-coffee-table/',
    'https://roco.pk/product/helix-solid-wood-console-table/',
    'https://roco.pk/product/nishat-wooden-console-table/',
    'https://roco.pk/product/urban-round-coffee-table/'
]

office_urls = [
    'https://roco.pk/product/verano-office-desk/',
    'https://roco.pk/product/executive-workspace-desk/',
    'https://roco.pk/product/velora-prestige-desk/',
    'https://roco.pk/product/oak-slate-executive-desk/',
    'https://roco.pk/product/stalwart-file-cabinet/',
    'https://roco.pk/product/velora-desk-drawer/',
    'https://roco.pk/product/apex-credenza/'
]

def fetch_html(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=15) as res:
            return res.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return ""

def download_and_save_webp(img_url, dest_path, max_dim=1200):
    try:
        # If url is nitrocdn or relative, clean it
        if not img_url.startswith('http'):
            return False
        req = urllib.request.Request(img_url, headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=12) as res:
            data = res.read()
        img = Image.open(io.BytesIO(data))
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            # Convert RGBA to RGB with white background
            bg = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode != 'RGBA':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Resize if dimensions exceed max_dim
        w, h = img.size
        if w > max_dim or h > max_dim:
            img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
            
        img.save(dest_path, 'WEBP', quality=85)
        return True
    except Exception as e:
        print(f"Error saving {img_url} to {dest_path}: {e}")
        return False

print("Starting asset and data collection...")
