import { getUserByToken, updateUser } from '$lib/server/database/schemas/user-model.js';
import { fail } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/server/config/email-messages';
import type { User } from '$lib/server/database/schemas/drizzle-schemas';

export async function load({ params }) {
	try {
		const token = params.token as string;
		const user: User | null = await getUserByToken(token);

		if (!user) {
			return fail(500, { error: 'User not found' });
		}

		let heading = 'Email Verification Problem';
		let message =
			'Your email could not be verified. Please contact support if you feel this is an error.';

		if (user) {
			sendWelcomeEmail(user.email);
			heading = 'Email Verified';
			message =
				'Your email has been verified. You can now <a href="/auth/sign-in" class="underline">sign in</a>';
			await updateUser(user.id, { verified: true });
		}
		return { heading, message };
	} catch (e) {
		return fail(500, { error: e });
	}
}
