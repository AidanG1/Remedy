import { json } from '@sveltejs/kit';
import { encode } from 'uint8-to-b64';
import { supabaseAdmin } from '$lib/db';
 
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { chat, uuid, public_key } = await request.json();
    console.log(chat, uuid, public_key);

    let { data, error } = await supabaseAdmin
        .from('chats')
        .select('members')
        .eq('id', chat)
        .single();
    if (error) {
        console.log(error);
        return json({ error: 'something went wrong' });
    }
    const { members } = data;

    let update = {};
    if (members == 0) {
        update = {
            member_one: uuid,
            member_one_pubkey: public_key,
        };
    } else if (members == 1) {
        update = {
            member_two: uuid,
            member_two_pubkey: public_key,
        };
    } else {
        return json({ error: 'the chatroom is full' });
    }

    const res = await supabaseAdmin
        .from('chats')
        .update({ ...update, members: members + 1 })
        .match({
            id: chat,
            // member_two: null,
        });
    data = res.data;
    error = res.error;

    if (error) {
        return json({
            error: 'something went wrong',
        });
    }

    return json({});
}