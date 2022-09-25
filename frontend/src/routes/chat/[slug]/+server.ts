import { json } from '@sveltejs/kit';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { chat, uuid, ciphertext, iv } = await request.json();

    const { data, error } = await supabaseAdmin
        .from('users')
        .select('id, verification, default_message')
        .eq('id', uuid)
        .single()
    if (error) {
        console.log(error)
    }

    supabaseAdmin
        .from('messages')
        .insert([
            {
                chat: chat,
                sender: data.verification ? 'person' : 'user',
                ciphertext,
                iv,
            },
        ])
        .then(({ data, error }) => {
            if (error) {
                console.log(error);
            }
        });
            
    return json({})
}