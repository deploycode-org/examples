import Link from "next/link";

const checks = [
  {
    href: "/api/hello",
    title: "Route Handler",
    expect: "JSON with the server time, PORT and the container that answered; POST echoes its body.",
  },
  {
    href: "/actions",
    title: "Server Action",
    expect: "The button calls a function on the server and shows what it returned, without a reload.",
  },
  {
    href: "/old-proxy",
    title: "Proxy (middleware)",
    expect: "Redirects to /proxy, which shows the header proxy.ts added to the request.",
  },
  {
    href: "/isr",
    title: "ISR",
    expect: "Rendered at most every 30 s; POST /api/revalidate renders it again at once.",
  },
  {
    href: "/image",
    title: "next/image",
    expect: "A 1600 px JPEG served resized as WebP or AVIF through /_next/image.",
  },
  {
    href: "/streaming",
    title: "Streaming",
    expect: "The page shell arrives at once, the slow part three seconds later in the same response.",
  },
  {
    href: "/env",
    title: "Environment variables",
    expect: "NEXT_PUBLIC_BUILD_MESSAGE inlined at build time, RUNTIME_MESSAGE read per request.",
  },
];

export default function Home() {
  return (
    <main>
      <h1>Next.js Example</h1>
      <p>
        Next.js 16 App Router, served by <code>next start</code>. Each page checks one feature that
        depends on how the app is hosted.
      </p>
      <ul>
        {checks.map((check) => (
          <li key={check.href}>
            <Link href={check.href}>
              <strong>{check.title}</strong>
            </Link>{" "}
            — {check.expect}
          </li>
        ))}
      </ul>
    </main>
  );
}
