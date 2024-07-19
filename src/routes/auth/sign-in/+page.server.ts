import { fail, redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad, Actions } from './$types.js';
import { lucia } from '$lib/server/lucia';
import { Argon2id } from 'oslo/password';
import { userSchema } from '$lib/config/zod-schemas';
import { getUserByEmail } from '$lib/server/db/user-model';
import { zod } from 'sveltekit-superforms/adapters';

const signInSchema = userSchema.pick({
	email: true,
	password: true
});

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) {
		redirect(302, '/dashboard');
	}
	const loginForm = await superValidate(zod(signInSchema));
	return {
		loginForm
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signInSchema));
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		//add user to db
		try {
			const email = form.data.email.toLowerCase();
			const existingUser = await getUserByEmail(email);
			if (!existingUser) {
				setFlash({ type: 'error', message: 'The email or password is incorrect.' }, event);
				return setError(form, 'The email or password is incorrect.');
			}

			if (existingUser.password) {
				const validPassword = await new Argon2id().verify(
					existingUser.password,
					form.data.password
				);
				if (!validPassword) {
					setFlash({ type: 'error', message: 'The email or password is incorrect.' }, event);
					return setError(form, 'The email or password is incorrect.');
				} else {
					//password valid - set session
					const session = await lucia.createSession(existingUser.id, {});
					const sessionCookie = lucia.createSessionCookie(session.id);
					event.cookies.set(sessionCookie.name, sessionCookie.value, {
						path: '.',
						...sessionCookie.attributes
					});
					setFlash({ type: 'success', message: 'Sign in successful.' }, event);
					redirect(302, '/(protected)/dashboard');
					return new Response(null, {
						status: 302,
						headers: {
							Location: '/',
							'Set-Cookie': sessionCookie.serialize()
						}
					});
				}
			}
		} catch (e) {
			if (e instanceof URIError) {
				setFlash({ type: 'error', message: 'Invalid username or password.' }, event);
				return setError(form, 'Invalid username or password.');
			} else {
				setFlash(
					{ type: 'error', message: 'An unexpected error occurred. Please try again later.' },
					event
				);
				return setError(form, 'An unexpected error occurred. Please try again later.');
			}
		}

		return { form };
	}
};
