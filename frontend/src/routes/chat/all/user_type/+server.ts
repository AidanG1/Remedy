import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { id } = await request.json();
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('id', id)
    if (error) {
        console.log(error)
    }
    if (data.length === 0) {
        return json({ error: 'User does not exist' })
    }
    return json({ user_type: data[0].verification })
}