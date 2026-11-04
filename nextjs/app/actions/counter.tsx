"use client";

import { useActionState } from "react";
import { type ClickResult, click } from "./actions";

export function Counter() {
  const [result, action, pending] = useActionState<ClickResult>(click, null);
  return (
    <form action={action}>
      <button type="submit" disabled={pending}>
        {pending ? "Calling the server…" : "Call the Server Action"}
      </button>
      <p aria-live="polite">
        {result ? (
          <>
            Clicks on this server: <strong>{result.clicks}</strong>, at <code>{result.at}</code> on{" "}
            <code>{result.instance}</code>.
          </>
        ) : (
          "Not called yet."
        )}
      </p>
    </form>
  );
}
