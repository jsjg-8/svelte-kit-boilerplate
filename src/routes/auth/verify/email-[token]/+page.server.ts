import { getUserByToken, updateUser } from '$lib/server/db/user-model';
import { fail } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/config/email-messages';
import type { User } from '$lib/server/db/auth/schemas';

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
			sendWelcomeEmail(user.email, user.firstName);
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
