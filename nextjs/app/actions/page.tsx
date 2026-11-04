import { Back } from "@/app/back";
import { Counter } from "./counter";

export default function ActionsPage() {
  return (
    <main>
      <h1>Server Action</h1>
      <p>
        The button posts to a <code>&quot;use server&quot;</code> function by an id fixed at build time.
        The ids are kept in the build cache (<code>.next/cache</code>, up to 14 days): a build that
        starts without it gives the actions new ids, and a page left open from before gets a 404 —
        <em>This page couldn&apos;t load</em> — until it is reloaded. A rebuild that keeps the cache
        keeps the ids, and open pages go on working.
      </p>
      <Counter />
      <Back />
    </main>
  );
}
