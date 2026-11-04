import { Back } from "@/app/back";
import { Counter } from "./counter";

export default function ActionsPage() {
  return (
    <main>
      <h1>Server Action</h1>
      <p>
        The button posts to a <code>&quot;use server&quot;</code> function. It works only if the request
        reaches the same build that rendered the page: a redeploy gives the actions new ids, and a page
        left open from before answers <em>Failed to find Server Action</em> until it is reloaded.
      </p>
      <Counter />
      <Back />
    </main>
  );
}
