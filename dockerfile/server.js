import { readFileSync } from "node:fs";
import { createServer } from "node:http";

// The port the Dockerfile EXPOSEs, whatever PORT says: the example checks that the platform
// reads EXPOSE for the address instead of routing to its usual default.
const LISTEN_PORT = 8080;

// Written by the Dockerfile from its BUILD_MESSAGE build argument; absent when Railpack built it.
const buildMessage = () => {
  try {
    return readFileSync(new URL("./build-message.txt", import.meta.url), "utf8").trim();
  } catch {
    return null;
  }
};

const escape = (text) =>
  text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const page = () => {
  const builtWith = process.env.BUILT_WITH ?? "not this Dockerfile (Railpack?)";
  const message = buildMessage();
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dockerfile Example</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh;
             display: grid; place-items: center; background: #f7f7f8; color: #18181b; }
      main { max-width: 32rem; padding: 2rem; }
      code { background: #e4e4e7; padding: 0.1rem 0.3rem; border-radius: 0.25rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>Dockerfile Example</h1>
      <p>Built with <code>${escape(builtWith)}</code>.</p>
      <p>Build message: <code>${message === null ? "no build-message.txt" : escape(message)}</code>.</p>
      <p>Listening on port <code>${LISTEN_PORT}</code>; <code>PORT</code> is <code>${escape(process.env.PORT ?? "not set")}</code> and ignored.</p>
    </main>
  </body>
</html>
`;
};

createServer((request, response) => {
  if (request.url === "/health") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
    return;
  }
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(page());
}).listen(LISTEN_PORT, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${LISTEN_PORT}`);
});
