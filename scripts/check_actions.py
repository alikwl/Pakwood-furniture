import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

url = "https://api.github.com/repos/alikwl/Pakwood-furniture/actions/runs"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req, context=ctx) as res:
        data = json.loads(res.read().decode('utf-8'))
        print("Total workflow runs:", data.get('total_count'))
        for run in data.get('workflow_runs', [])[:5]:
            print(f"Run ID: {run.get('id')}, Name: {run.get('name')}, Status: {run.get('status')}, Conclusion: {run.get('conclusion')}")
            print(f"  URL: {run.get('html_url')}")
except Exception as e:
    print("API Error:", e)
