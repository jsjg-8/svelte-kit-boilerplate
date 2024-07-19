// src/lib/email.ts
import nodemailer from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import mailgunTransport from 'nodemailer-mailgun-transport';
import { MailtrapTransport } from 'mailtrap';

// Common
import { FROM_EMAIL, EMAIL_PROVIDER } from '$env/static/private';

// For SES
import {
	AWS_REGION,
	AWS_ACCESS_KEY_ID,
	AWS_SECRET_ACCESS_KEY,
	AWS_API_VERSION
} from '$env/static/private';

// For Mailtrap
import { MAILTRAP_TOKEN } from '$env/static/private';

// For Mailgun
import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from '$env/static/private';

// For SMTP
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } from '$env/static/private';

const emailProvider = EMAIL_PROVIDER;
const senderEmail = FROM_EMAIL;

const ses = new aws.SES({
	apiVersion: AWS_API_VERSION,
	region: AWS_REGION,
	credentials: {
		accessKeyId: AWS_ACCESS_KEY_ID,
		secretAccessKey: AWS_SECRET_ACCESS_KEY
	}
});

function createTransport() {
	switch (emailProvider) {
		case 'ses':
			return nodemailer.createTransport({
				SES: { ses, aws }
			});
		case 'mailtrap':
			return nodemailer.createTransport(
				MailtrapTransport({
					token: MAILTRAP_TOKEN
				})
			);
		case 'mailgun':
			return nodemailer.createTransport(
				mailgunTransport({
					auth: {
						api_key: MAILGUN_API_KEY,
						domain: MAILGUN_DOMAIN
					}
				})
			);
		case 'smtp':
			return nodemailer.createTransport({
				host: SMTP_HOST,
				port: parseInt(SMTP_PORT, 10),
				secure: false, // true for 465, false for other ports
				auth: {
					user: SMTP_USER,
					pass: SMTP_PASS
				}
			});
		default:
			throw new Error('Invalid email provider specified');
	}
}

export async function sendEmail(
	email: string,
	subject: string,
	bodyHtml?: string,
	bodyText?: string,
	attachments?: []
) {
	const transporter = createTransport();

	const mailOptions: nodemailer.SendMailOptions = {
		from: senderEmail,
		to: email,
		subject,
		...(bodyHtml ? { html: bodyHtml } : {}),
		...(bodyText ? { text: bodyText } : {}),
		...(attachments ? { attachments } : {})
	};

	try {
		await transporter.sendMail(mailOptions);
		console.log('Email sent successfully');
		return {
			statusCode: 200,
			message: 'Email sent successfully.'
		};
	} catch (error) {
		console.error('Error sending email:', error);
		throw new Error(`Error sending email: ${JSON.stringify(error)}`);
	}
}
