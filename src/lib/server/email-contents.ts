import { BASE_URL, APP_NAME } from '$lib/config/constants';

const emailTemplateContent = `<!doctype html>
<html lang="en">
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Transactional Email</title>
		<style media="all" type="text/css">
			body {
				font-family: Helvetica, sans-serif;
				-webkit-font-smoothing: antialiased;
				font-size: 16px;
				line-height: 1.3;
				-ms-text-size-adjust: 100%;
				-webkit-text-size-adjust: 100%;
			}

			table {
				border-collapse: separate;
				mso-table-lspace: 0pt;
				mso-table-rspace: 0pt;
				width: 100%;
			}

			table td {
				font-family: Helvetica, sans-serif;
				font-size: 16px;
				vertical-align: top;
			}

			body {
				background-color: #f4f5f6;
				margin: 0;
				padding: 0;
			}

			.body {
				background-color: #f4f5f6;
				width: 100%;
			}

			.container {
				margin: 0 auto !important;
				max-width: 600px;
				padding: 0;
				padding-top: 24px;
				width: 600px;
			}

			.content {
				box-sizing: border-box;
				display: block;
				margin: 0 auto;
				max-width: 600px;
				padding: 0;
			}

			.main {
				background: #ffffff;
				border: 1px solid #eaebed;
				border-radius: 16px;
				width: 100%;
			}

			.wrapper {
				box-sizing: border-box;
				padding: 24px;
			}

			.footer {
				clear: both;
				padding-top: 24px;
				text-align: center;
				width: 100%;
			}

			.footer td,
			.footer p,
			.footer span,
			.footer a {
				color: #9a9ea6;
				font-size: 16px;
				text-align: center;
			}

			p {
				font-family: Helvetica, sans-serif;
				font-size: 16px;
				font-weight: normal;
				margin: 0;
				margin-bottom: 16px;
			}

			a {
				color: #0867ec;
				text-decoration: underline;
			}

			.btn {
				box-sizing: border-box;
				min-width: 100% !important;
				width: 100%;
			}

			.btn > tbody > tr > td {
				padding-bottom: 16px;
			}

			.btn table {
				width: auto;
			}

			.btn table td {
				background-color: #ffffff;
				border-radius: 4px;
				text-align: center;
			}

			.btn a {
				background-color: #ffffff;
				border: solid 2px #0867ec;
				border-radius: 4px;
				box-sizing: border-box;
				color: #0867ec;
				cursor: pointer;
				display: inline-block;
				font-size: 16px;
				font-weight: bold;
				margin: 0;
				padding: 12px 24px;
				text-decoration: none;
				text-transform: capitalize;
			}

			.btn-primary table td {
				background-color: #0867ec;
			}

			.btn-primary a {
				background-color: #0867ec;
				border-color: #0867ec;
				color: #ffffff;
			}

			@media all {
				.btn-primary table td:hover {
					background-color: #ec0867 !important;
				}
				.btn-primary a:hover {
					background-color: #ec0867 !important;
					border-color: #ec0867 !important;
				}
			}
			.last {
				margin-bottom: 0;
			}

			.first {
				margin-top: 0;
			}

			.align-center {
				text-align: center;
			}

			.align-right {
				text-align: right;
			}

			.align-left {
				text-align: left;
			}

			.text-link {
				color: #0867ec !important;
				text-decoration: underline !important;
			}

			.clear {
				clear: both;
			}

			.mt0 {
				margin-top: 0;
			}

			.mb0 {
				margin-bottom: 0;
			}

			.preheader {
				color: transparent;
				display: none;
				height: 0;
				max-height: 0;
				max-width: 0;
				opacity: 0;
				overflow: hidden;
				mso-hide: all;
				visibility: hidden;
				width: 0;
			}

			.powered-by a {
				text-decoration: none;
			}

			@media only screen and (max-width: 640px) {
				.main p,
				.main td,
				.main span {
					font-size: 16px !important;
				}
				.wrapper {
					padding: 8px !important;
				}
				.content {
					padding: 0 !important;
				}
				.container {
					padding: 0 !important;
					padding-top: 8px !important;
					width: 100% !important;
				}
				.main {
					border-left-width: 0 !important;
					border-radius: 0 !important;
					border-right-width: 0 !important;
				}
				.btn table {
					max-width: 100% !important;
					width: 100% !important;
				}
				.btn a {
					font-size: 16px !important;
					max-width: 100% !important;
					width: 100% !important;
				}
			}

			@media all {
				.ExternalClass {
					width: 100%;
				}
				.ExternalClass,
				.ExternalClass p,
				.ExternalClass span,
				.ExternalClass font,
				.ExternalClass td,
				.ExternalClass div {
					line-height: 100%;
				}
				.apple-link a {
					color: inherit !important;
					font-family: inherit !important;
					font-size: inherit !important;
					font-weight: inherit !important;
					line-height: inherit !important;
					text-decoration: none !important;
				}
				#MessageViewBody a {
					color: inherit;
					text-decoration: none;
					font-size: inherit;
					font-family: inherit;
					font-weight: inherit;
					line-height: inherit;
				}
			}
		</style>
	</head>

	<body>
		<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
			<tr>
				<td>&nbsp;</td>
				<td class="container">
					<div class="content">
						<!-- START CENTERED WHITE CONTAINER -->
						<span class="preheader">{{preheader_text}}</span>
						<table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main">
							<!-- START MAIN CONTENT AREA -->
							<tr>
								<td class="wrapper">
									<p>Hi {{recipient_name}},</p>
									<p>{{email_body}}</p>
									<table
										role="presentation"
										border="0"
										cellpadding="0"
										cellspacing="0"
										class="btn btn-primary"
									>
										<tbody>
											<tr>
												<td align="left">
													<table role="presentation" border="0" cellpadding="0" cellspacing="0">
														<tbody>
															<tr>
																<td>
																	<a href="{{cta_link}}" target="_blank">{{cta_text}}</a>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
									<p>{{additional_message}}</p>
									<p>Best regards,<br />Your Company</p>
								</td>
							</tr>
							<!-- END MAIN CONTENT AREA -->
						</table>
						<!-- START FOOTER -->
						<div class="footer">
							<table role="presentation" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td class="content-block powered-by">
										&copy; {{year}}. Powered by <a href="http://jsjg.pro">JSJG</a>
									</td>
								</tr>
							</table>
						</div>
						<!-- END FOOTER -->
						<!-- END CENTERED WHITE CONTAINER -->
					</div>
				</td>
				<td>&nbsp;</td>
			</tr>
		</table>
	</body>
</html>
`;
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
