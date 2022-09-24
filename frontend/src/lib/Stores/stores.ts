import { writable, type Writable } from 'svelte/store';
import type { Message } from '../Utils/types';

export const messages: Writable<Message[]> = writable([]);
export const default_message: Writable<string> = writable('');