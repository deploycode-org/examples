import { connection } from "next/server";
import { Suspense } from "react";
import { Back } from "@/app/back";

async function Slow() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <p>
      <strong>The slow part arrived</strong> at <code>{new Date().toISOString()}</code>, three seconds
      after the shell, in the same response.
    </p>
  );
}

export default async function StreamingPage() {
  await connection();
  return (
    <main>
      <h1>Streaming</h1>
      <p>
        Shell sent at <code>{new Date().toISOString()}</code>. A proxy that buffers responses holds it
        back until the slow part is ready, and the page appears all at once after three seconds.
      </p>
      <Suspense fallback={<p>Waiting for the slow part…</p>}>
        <Slow />
      </Suspense>
      <Back />
    </main>
  );
}
