import { hostname } from "node:os";

/**
 * The container that answered. With several replicas, or after a redeploy, the pages tell which
 * one rendered them — each keeps its own ISR cache and its own Server Action state.
 */
export const instance = () => hostname();
