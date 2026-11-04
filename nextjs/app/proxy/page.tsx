import { headers } from "next/headers";
import { Back } from "@/app/back";

export default async function ProxyPage() {
  const proxyAt = (await headers()).get("x-proxy-at");
  return (
    <main>
      <h1>Proxy</h1>
      <p>
        {proxyAt ? (
          <>
            <code>proxy.ts</code> ran for this request at <code>{proxyAt}</code> and set the response
            header <code>x-deploycode-proxy: ran</code>.
          </>
        ) : (
          <>
            <strong>The proxy did not run</strong>: the request header it adds is missing.
          </>
        )}
      </p>
      <Back />
    </main>
  );
}
