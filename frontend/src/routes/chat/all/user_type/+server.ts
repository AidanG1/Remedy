import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { id } = await request.json();
    console.log(id)
    const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, verification')
        .eq('id', id)
        .single()
    console.log('data', data)
    if (error) {
        console.log(error)
    }
    if (data === null) {
        return json({ error: 'User does not exist' })
    }
    return json({ user_type: data.verification })
}