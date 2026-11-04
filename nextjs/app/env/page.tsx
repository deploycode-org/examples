import { connection } from "next/server";
import { Back } from "@/app/back";
import { BuildMessage } from "./build-message";

export default async function EnvPage() {
  // read per request, so a changed variable shows after a restart, without a new build
  await connection();
  return (
    <main>
      <h1>Environment variables</h1>
      <BuildMessage />
      <p>
        <code>RUNTIME_MESSAGE</code> on the server:{" "}
        <code>{process.env.RUNTIME_MESSAGE ?? "not set"}</code>; <code>PORT</code> is{" "}
        <code>{process.env.PORT ?? "not set"}</code>.
      </p>
      <p>
        A <code>NEXT_PUBLIC_</code> variable is written into the JavaScript during the build: it needs
        the build phase, and changing it needs a new build. A server-only variable is read when the page
        renders.
      </p>
      <Back />
    </main>
  );
}
