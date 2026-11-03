import os

from django.http import HttpResponse, JsonResponse

PAGE = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Django Example</title>
    <style>
      body {{ font-family: system-ui, sans-serif; margin: 0; min-height: 100vh;
             display: grid; place-items: center; background: #f7f7f8; color: #18181b; }}
      main {{ max-width: 32rem; padding: 2rem; }}
      code {{ background: #e4e4e7; padding: 0.1rem 0.3rem; border-radius: 0.25rem; }}
    </style>
  </head>
  <body>
    <main>
      <h1>Django Example</h1>
      <p>To get started, edit <code>config/views.py</code>.</p>
      <p>Listening on port <code>{port}</code>.</p>
    </main>
  </body>
</html>
"""


def index(request):
    return HttpResponse(PAGE.format(port=os.environ.get("PORT", "8000")))


def health(request):
    return JsonResponse({"status": "ok"})
