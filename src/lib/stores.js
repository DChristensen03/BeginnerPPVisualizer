import { writable } from "svelte/store";

export const printMode = writable(false);
export const numRaces = writable(5);
export const animationsEnabled = writable(false);