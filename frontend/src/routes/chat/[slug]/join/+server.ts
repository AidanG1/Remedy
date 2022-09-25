import { json } from '@sveltejs/kit';
import { encode } from 'uint8-to-b64';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { chat, uuid, public_key } = await request.json();
    console.log(chat, uuid, public_key);

    const { data, error } = await supabaseAdmin
        .from('chats')
        .update({
            member_two: uuid,
            member_two_pubkey: public_key,
        })
        .match({
            id: chat,
            // member_two: null,
        });
    if (error) {
        return json({
            error: 'something went wrong',
        });
    }

    return json({});
}