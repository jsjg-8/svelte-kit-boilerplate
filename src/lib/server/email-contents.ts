import { BASE_URL, APP_NAME } from '$lib/config/constants';
import { readFileSync } from 'fs';
import path from 'path';

// Read the HTML template
const emailTemplatePath = path.resolve('src/lib/templates/email.html');
const emailTemplateContent = readFileSync(emailTemplatePath, 'utf8');
type vars = {
	preheader_text: string;
	recipient_name: string;
	email_body: string;
	additional_message: string;
	cta_link: string;
	cta_text: string;
	year: string;
};

const generateEmailHtml = (variables: vars) => {
	let emailHtml = emailTemplateContent;

	(Object.keys(variables) as Array<keyof vars>).forEach((key) => {
		const placeholder = `{{${key}}}`;
		emailHtml = emailHtml.replace(new RegExp(placeholder, 'g'), variables[key]);
	});

	return emailHtml;
};

export const generateVerificationEmail = (name: string, token: string) => {
	const verifyEmailURL = `${BASE_URL}/auth/verify/email-${token}`;
	const variables = {
		preheader_text: 'Please verify your email address.',
		recipient_name: name,
		email_body: `Please click this <a href="${verifyEmailURL}" class="button">link</a> to verify your email address for your ${APP_NAME} account.<br>You can also visit the link below:<br><a href="${verifyEmailURL}">${verifyEmailURL}</a><br>If you did not create this account, you can disregard this email.`,
		additional_message: '',
		cta_link: verifyEmailURL,
		cta_text: 'Verify Email',
		year: new Date().getFullYear().toString()
	};

	const html = generateEmailHtml(variables);

	const text = `Please visit the link below to verify your email address for your ${APP_NAME} account.\n\n${verifyEmailURL}\n\nIf you did not create this account, you can disregard this email.`;

	return { text, html, subject: `Please confirm your email address for ${APP_NAME}` };
};

// Similarly update the other functions
export const generateWelcomeEmail = (name: string) => {
	const variables: vars = {
		preheader_text: 'Welcome to our community!',
		recipient_name: name,
		email_body: `Thanks for verifying your account with ${APP_NAME}.<br>You can now <a href="${BASE_URL}/auth/sign-in" class="button">sign in</a> to your account.`,
		additional_message: '',
		cta_link: `${BASE_URL}/auth/sign-in`,
		cta_text: 'Sign In',
		year: new Date().getFullYear().toString()
	};

	const html = generateEmailHtml(variables);

	const text = `Thanks for verifying your account with ${APP_NAME}.\nYou can now sign in to your account at the link below.\n\n${BASE_URL}/auth/sign-in`;

	return { text, html, subject: `Welcome to ${APP_NAME}` };
};

export const generatePasswordResetEmail = (name: string, token: string) => {
	const updatePasswordURL = `${BASE_URL}/auth/password/update-${token}`;
	const variables = {
		preheader_text: 'Reset your password.',
		recipient_name: name,
		email_body: `Please click this <a href="${updatePasswordURL}" class="button">link</a> to change your password for ${APP_NAME}.<br>You can also visit the link below:<br><a href="${updatePasswordURL}">${updatePasswordURL}</a><br>If you did not request to change your password, you can disregard this email.`,
		additional_message: '',
		cta_link: updatePasswordURL,
		cta_text: 'Reset Password',
		year: new Date().getFullYear().toString()
	};

	const html = generateEmailHtml(variables);

	const text = `Please visit the link below to change your password for ${APP_NAME}.\n\n${updatePasswordURL}\n\nIf you did not request to change your password, you can disregard this email.`;

	return { text, html, subject: `Change your password for ${APP_NAME}` };
};

export const generateEmailUpdateEmails = (
	name: string,
	email: string,
	oldEmail: string,
	token: string
) => {
	const verifyEmailURL = `${BASE_URL}/auth/verify/email-${token}`;
	const newEmailVariables = {
		preheader_text: 'Verify your new email address.',
		recipient_name: name,
		email_body: `Please click this <a href="${verifyEmailURL}" class="button">link</a> to verify your new email address for your ${APP_NAME} account.<br>You can also visit the link below:<br><a href="${verifyEmailURL}">${verifyEmailURL}</a>`,
		additional_message: '',
		cta_link: verifyEmailURL,
		cta_text: 'Verify Email',
		year: new Date().getFullYear().toString()
	};

	const newEmailHtml = generateEmailHtml(newEmailVariables);

	const oldEmailVariables = {
		preheader_text: 'Your email address has been updated.',
		recipient_name: name,
		email_body: `Your ${APP_NAME} account email has been updated from ${oldEmail} to ${email}.<br>If you DID NOT request this change, please contact support at: <a href="${BASE_URL}">${BASE_URL}</a> to revert the changes.`,
		additional_message: '',
		cta_link: `${BASE_URL}/support`,
		cta_text: 'Contact Support',
		year: new Date().getFullYear().toString()
	};

	const oldEmailHtml = generateEmailHtml(oldEmailVariables);

	const newEmailText = `Please visit the link below to verify your email address for your ${APP_NAME} account.\n\n${verifyEmailURL}`;
	const oldEmailText = `Your ${APP_NAME} account email has been updated from ${oldEmail} to ${email}. If you DID NOT request this change, please contact support at: ${BASE_URL} to revert the changes.`;

	return {
		newEmail: {
			text: newEmailText,
			html: newEmailHtml,
			subject: `Please confirm your email address for ${APP_NAME}`
		},
		oldEmail: {
			text: oldEmailText,
			html: oldEmailHtml,
			subject: `Your email address for ${APP_NAME} has changed.`
		}
	};
};
