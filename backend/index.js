import * as dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_PUBLIC_ANON_KEY = process.env.SUPABASE_PUBLIC_ANON_KEY || '';
const JWT_KEY = process.env.JWT_KEY;

if (JWT_KEY === undefined) {
	throw new Error('no JWT_KEY in env');
}

const supabase = createClient(
	SUPABASE_URL,
	SUPABASE_PUBLIC_ANON_KEY,
);

const app = new Koa();
const router = new Router();

router.post('/register', async (ctx) => {
	const { data, error } = await supabase.from('users').insert([
		{ id: uuid() },
	]);
	console.log(data, error);
	const token = jwt.sign(data[0], JWT_KEY);
	ctx.body = { token };
});

app
	.use(router.routes())
	.use(router.allowedMethods());
app.listen(process.env.PORT || 1337);
