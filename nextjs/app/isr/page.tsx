import { Back } from "@/app/back";
import { instance } from "@/app/instance";

// rendered at build time, then again at most once every 30 s, by the request that finds it stale
export const revalidate = 30;

export default function IsrPage() {
  const renderedAt = new Date().toISOString();
  return (
    <main>
      <h1>ISR</h1>
      <p>
        Rendered at <code>{renderedAt}</code> on <code>{instance()}</code>.
      </p>
      <p>
        Reload: the time stays for 30 s. The first request after that still gets this copy and renders
        a new one in the background, so the time moves on the request after it. <code>POST
        /api/revalidate</code> drops the copy at once.
      </p>
      <p>
        The copy lives in <code>.next</code> inside the container. A new container — a redeploy or a
        restart — starts from the copy made during the build, and each replica keeps its own.
      </p>
      <Back />
    </main>
  );
}
