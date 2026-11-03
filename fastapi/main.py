import os

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI(title="FastAPI Example")

PAGE = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>FastAPI Example</title>
    <style>
      body {{ font-family: system-ui, sans-serif; margin: 0; min-height: 100vh;
             display: grid; place-items: center; background: #f7f7f8; color: #18181b; }}
      main {{ max-width: 32rem; padding: 2rem; }}
      code {{ background: #e4e4e7; padding: 0.1rem 0.3rem; border-radius: 0.25rem; }}
    </style>
  </head>
  <body>
    <main>
      <h1>FastAPI Example</h1>
      <p>To get started, edit <code>main.py</code>. The API docs are at <a href="/docs">/docs</a>.</p>
      <p>Listening on port <code>{port}</code>.</p>
    </main>
  </body>
</html>
"""


@app.get("/", response_class=HTMLResponse)
def index() -> str:
    return PAGE.format(port=os.environ.get("PORT", "8000"))


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
