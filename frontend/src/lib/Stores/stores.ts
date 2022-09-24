import { writable, type Writable } from 'svelte/store';

export const question_num: Writable<number> = writable(0);
export const question_path: Writable<number[]> = writable([0]);