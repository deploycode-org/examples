import { createServer } from "node:http";

// Always 8080, whatever PORT says: the example is a check that the platform notices an app
// listening somewhere else than its domain routes to.
const LISTEN_PORT = 8080;
// 127.0.0.1 here makes the app unreachable from outside its container, a second thing to notice.
const BIND_ADDRESS = process.env.BIND_ADDRESS ?? "0.0.0.0";

const page = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Fixed Port Example</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh;
             display: grid; place-items: center; background: #f7f7f8; color: #18181b; }
      main { max-width: 32rem; padding: 2rem; }
      code { background: #e4e4e7; padding: 0.1rem 0.3rem; border-radius: 0.25rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>Fixed Port Example</h1>
      <p>Listening on port <code>${LISTEN_PORT}</code>; <code>PORT</code> is <code>${process.env.PORT ?? "not set"}</code> and ignored.</p>
    </main>
  </body>
</html>
`;

createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(page());
}).listen(LISTEN_PORT, BIND_ADDRESS, () => {
  console.log(`Listening on ${BIND_ADDRESS}:${LISTEN_PORT}`);
});
