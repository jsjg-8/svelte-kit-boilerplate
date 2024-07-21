import { lucia } from '$lib/server/lucia';
import { redirect, type Handle } from '@sveltejs/kit';
import type { HandleServerError } from '@sveltejs/kit';
import log from '$lib/server/log';

export const handleError: HandleServerError = async ({ error, event }) => {
	const errorId = crypto.randomUUID();
	event.locals.error = error?.toString() || '';
	event.locals.errorStackTrace = error instanceof Error ? error.stack || '' : '';
	event.locals.errorId = errorId;
	log(500, event); // Log the error with a 500 status code

	return {
		message: 'An unexpected error occurred.',
		errorId
	};
};

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const startTimer = Date.now();
		event.locals.startTimer = startTimer;

		const sessionId = event.cookies.get(lucia.sessionCookieName);
		if (!sessionId) {
			event.locals.user = null;
			event.locals.session = null;
			return resolve(event);
		}

		const { session, user } = await lucia.validateSession(sessionId);
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			event.cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		event.locals.user = user;
		event.locals.session = session;

		if (event.route.id?.startsWith('/(protected)')) {
			if (!user) throw redirect(302, '/auth/sign-in');
			if (!user.verified) throw redirect(302, '/auth/verify/email');
		}
		if (event.route.id?.startsWith('/(admin)')) {
			if (user?.role !== 'ADMIN') throw redirect(302, '/auth/sign-in');
		}

		const response = await resolve(event);
		log(response.status, event); // Log the response status
		return response;
	} catch (error) {
		log(500, event); // Log the error with a 500 status code
		throw error;
	}
};
