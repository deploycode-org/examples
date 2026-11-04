import { instance } from "@/app/instance";

// answered per request: a cached response would show the time of the build
export const dynamic = "force-dynamic";

const answer = (method: string, body?: unknown) =>
  Response.json({
    ok: true,
    method,
    at: new Date().toISOString(),
    port: process.env.PORT ?? null,
    node: process.version,
    instance: instance(),
    ...(body === undefined ? {} : { body }),
  });

export function GET() {
  return answer("GET");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  return answer("POST", body);
}
