import { writable, type Writable } from 'svelte/store';

export const question_path: Writable<number[]> = writable([]);