"use server";

import { instance } from "@/app/instance";

export type ClickResult = { clicks: number; at: string; instance: string } | null;

// kept in the server's memory: a restart or another replica starts from zero
let clicks = 0;

export async function click(_previous: ClickResult): Promise<ClickResult> {
  clicks += 1;
  return { clicks, at: new Date().toISOString(), instance: instance() };
}
