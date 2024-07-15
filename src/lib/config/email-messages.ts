import { sendEmail } from '$lib/server/email-send';
import {
	generateVerificationEmail,
	generateWelcomeEmail,
	generatePasswordResetEmail,
	generateEmailUpdateEmails
} from '$lib/server/email-contents';

export const sendVerificationEmail = async (email: string, token: string) => {
	try {
		const { text, html, subject } = generateVerificationEmail(token);
		const result = await sendEmail(email, subject, html, text);
		return result;
	} catch (error) {
		console.error(`Error sending verification email to ${email}:`, error);
		throw new Error('Failed to send verification email.');
	}
};

export const sendWelcomeEmail = async (email: string) => {
	try {
		const { text, html, subject } = generateWelcomeEmail();
		const result = await sendEmail(email, subject, html, text);
		return result;
	} catch (error) {
		console.error(`Error sending welcome email to ${email}:`, error);
		throw new Error('Failed to send welcome email.');
	}
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	try {
		const { text, html, subject } = generatePasswordResetEmail(token);
		const result = await sendEmail(email, subject, html, text);
		return result;
	} catch (error) {
		console.error(`Error sending password reset email to ${email}:`, error);
		throw new Error('Failed to send password reset email.');
	}
};

export const updateEmailAddressSuccessEmail = async (
	email: string,
	oldEmail: string,
	token: string
) => {
	try {
		const { newEmail, oldEmail: oldEmailContent } = generateEmailUpdateEmails(
			email,
			oldEmail,
			token
		);
		await sendEmail(email, newEmail.subject, newEmail.html, newEmail.text);
		await sendEmail(oldEmail, oldEmailContent.subject, oldEmailContent.html, oldEmailContent.text);
	} catch (error) {
		console.error(`Error updating email address from ${oldEmail} to ${email}:`, error);
		throw new Error('Failed to update email address.');
	}
};
