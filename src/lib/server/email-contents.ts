import { BASE_URL, APP_NAME } from '$lib/config/constants';

const emailStyles = `
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
  }
  .container {
    width: 100%;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
  }
  .header {
    text-align: center;
    background-color: #f4f4f4;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
  }
  .content {
    padding: 20px;
  }
  .button {
    display: inline-block;
    padding: 2px 4px;
    margin: 4px 0;
    font-size: 16px;
    color: #fff;
    background-color: #007BFF;
    text-decoration: none;
    border-radius: 5px;
  }
  .footer {
    text-align: center;
    padding: 10px;
    font-size: 12px;
    color: #aaa;
  }
`;

const emailTemplate = (title: string, body: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${emailStyles}</style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>${APP_NAME}</h1>
        </div>
        <div class="content">
            <h2>${title}</h2>
            <p>${body}</p>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${APP_NAME}. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const generateVerificationEmail = (token: string) => {
	const verifyEmailURL = `${BASE_URL}/auth/verify/email-${token}`;
	const text = `Please visit the link below to verify your email address for your ${APP_NAME} account.\n\n${verifyEmailURL}\n\nIf you did not create this account, you can disregard this email.`;
	const html = emailTemplate(
		'Verify Your Email Address',
		`Please click this <a href="${verifyEmailURL}" class="button">link</a> to verify your email address for your ${APP_NAME} account.<br>You can also visit the link below:<br><a href="${verifyEmailURL}">${verifyEmailURL}</a><br>If you did not create this account, you can disregard this email.`
	);
	return { text, html, subject: `Please confirm your email address for ${APP_NAME}` };
};

export const generateWelcomeEmail = () => {
	const text = `Thanks for verifying your account with ${APP_NAME}.\nYou can now sign in to your account at the link below.\n\n${BASE_URL}/auth/sign-in`;
	const html = emailTemplate(
		`Welcome to ${APP_NAME}`,
		`Thanks for verifying your account with ${APP_NAME}.<br>You can now <a href="${BASE_URL}/auth/sign-in" class="button">sign in</a> to your account.`
	);
	return { text, html, subject: `Welcome to ${APP_NAME}` };
};

export const generatePasswordResetEmail = (token: string) => {
	const updatePasswordURL = `${BASE_URL}/auth/password/update-${token}`;
	const text = `Please visit the link below to change your password for ${APP_NAME}.\n\n${updatePasswordURL}\n\nIf you did not request to change your password, you can disregard this email.`;
	const html = emailTemplate(
		'Reset Your Password',
		`Please click this <a href="${updatePasswordURL}" class="button">link</a> to change your password for ${APP_NAME}.<br>You can also visit the link below:<br><a href="${updatePasswordURL}">${updatePasswordURL}</a><br>If you did not request to change your password, you can disregard this email.`
	);
	return { text, html, subject: `Change your password for ${APP_NAME}` };
};

export const generateEmailUpdateEmails = (email: string, oldEmail: string, token: string) => {
	const verifyEmailURL = `${BASE_URL}/auth/verify/email-${token}`;
	const newEmailText = `Please visit the link below to verify your email address for your ${APP_NAME} account.\n\n${verifyEmailURL}`;
	const newEmailHtml = emailTemplate(
		'Verify Your New Email Address',
		`Please click this <a href="${verifyEmailURL}" class="button">link</a> to verify your new email address for your ${APP_NAME} account.<br>You can also visit the link below:<br><a href="${verifyEmailURL}">${verifyEmailURL}</a>`
	);

	const oldEmailText = `Your ${APP_NAME} account email has been updated from ${oldEmail} to ${email}. If you DID NOT request this change, please contact support at: ${BASE_URL} to revert the changes.`;
	const oldEmailHtml = emailTemplate(
		'Email Address Updated',
		`Your ${APP_NAME} account email has been updated from ${oldEmail} to ${email}.<br>If you DID NOT request this change, please contact support at: <a href="${BASE_URL}">${BASE_URL}</a> to revert the changes.`
	);

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
