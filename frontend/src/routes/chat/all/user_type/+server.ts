import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { id } = await request.json();
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, verification, default_message')
        .eq('id', id)
        .single()
    if (error) {
        console.log(error)
    }
    if (data === null) {
        return json({ error: 'User does not exist' })
    }
    return json({ user_type: data.verification, default_message: data.default_message })
}