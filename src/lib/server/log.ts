import { Axiom } from '@axiomhq/js';
import { AXIOM_TOKEN, AXIOM_ORG_ID, AXIOM_DATASET } from '$env/static/private';
import { getAllUrlParams, parseTrack, parseMessage } from '$lib/utils';
import { DOMAIN } from '$lib/config/constants';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default async function log(statusCode: number, event) {
	try {
		const level = statusCode >= 400 ? 'error' : 'info';
		const { error, errorId, errorStackTrace, message, track, startTimer, user } =
			event?.locals || {};
		const urlParams = event?.url?.search ? await getAllUrlParams(event.url.search) : {};
		const messageEvents = message ? await parseMessage(message) : {};
		const trackEvents = track ? await parseTrack(track) : {};

		let referer = event.request.headers.get('referer');
		if (referer) {
			const refererUrl = new URL(referer);
			const refererHostname = refererUrl.hostname;
			referer =
				refererHostname === 'localhost' || refererHostname === DOMAIN
					? refererUrl.pathname
					: referer;
		}

		const logData = {
			level,
			method: event.request.method,
			path: event.url.pathname,
			status: statusCode,
			timeInMs: Date.now() - startTimer,
			user: user?.email,
			userId: user?.userId,
			referer,
			error,
			errorId,
			errorStackTrace,
			...urlParams,
			...messageEvents,
			...trackEvents
		};

		console.log('log:', JSON.stringify(logData));

		const client = new Axiom({ token: AXIOM_TOKEN, orgId: AXIOM_ORG_ID });
		await client.ingest(AXIOM_DATASET, [logData]);
	} catch (err) {
		throw new Error(`Error Logger: ${JSON.stringify(err)}`);
	}
}
