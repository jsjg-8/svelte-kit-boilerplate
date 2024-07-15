import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export async function parseTrack(track: unknown): Promise<object> {
	let trackObj = {};
	try {
		if (track) {
			if (typeof track === 'string') {
				trackObj = { track: track };
			} else {
				trackObj = track;
			}
		}
	} catch (error) {
		console.log('error: ', error);
	}
	return trackObj;
}

export function convertNameToInitials(firstName: string, lastName: string): string {
	const firstInitial = Array.from(firstName)[0];
	const lastInitial = Array.from(lastName)[0];
	return `${firstInitial}${lastInitial}`;
}


export async function getAllUrlParams(url: string): Promise<object> {
	let paramsObj = {};
	try {
		url = url?.slice(1); //remove leading ?
		if (!url) return {}; //if no params return
		paramsObj = await Object.fromEntries(await new URLSearchParams(url));
	} catch (error) {
		console.log('error: ', error);
	}
	return paramsObj;
}


export async function parseMessage(message: unknown): Promise<object> {
	let messageObj = {};
	try {
		if (message) {
			if (typeof message === 'string') {
				messageObj = { message: message };
			} else {
				messageObj = message;
			}
		}
	} catch (error) {
		console.log('error: ', error);
	}
	return messageObj;
}



export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === "none" ? "" : style.transform;

	const scaleConversion = (
		valueA: number,
		scaleA: [number, number],
		scaleB: [number, number]
	) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (
		style: Record<string, number | string | undefined>
	): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, "");
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};