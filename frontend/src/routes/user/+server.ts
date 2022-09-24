import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { data, error } = await supabaseAdmin
        .from('users')
        .insert({})
    if (error) {
        console.log(error)
    }
    if (data.length === 0) {
        return json({ error: 'Unable to create user' })
    }
    return json({ uuid: data[0].id })
}