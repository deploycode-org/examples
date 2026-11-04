import { revalidatePath } from "next/cache";
import { instance } from "@/app/instance";

/**
 * On-demand ISR: the next request to /isr renders it again instead of waiting out its 30 s. Only
 * /isr — an open endpoint that could drop any page's cache would be a gift to whoever finds it.
 */
export function POST() {
  revalidatePath("/isr");
  return Response.json({ revalidated: "/isr", at: new Date().toISOString(), instance: instance() });
}
