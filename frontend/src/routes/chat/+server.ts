import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { id, chat_type } = await request.json();
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
    const { data: data2, error: error2 } = await supabaseAdmin
        .from('chats')
        .insert({
            chat_type: chat_type,
        })

    if (error2) {
        console.log(error2)
    }
    return json({ chat_id: data2[0].id })
}