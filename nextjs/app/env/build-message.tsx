"use client";

// replaced by its value during `next build`: the variable must exist when the image is built
const buildMessage = process.env.NEXT_PUBLIC_BUILD_MESSAGE;

export function BuildMessage() {
  return (
    <p>
      <code>NEXT_PUBLIC_BUILD_MESSAGE</code> in the browser:{" "}
      <code>{buildMessage ?? "not set at build time"}</code>.
    </p>
  );
}
