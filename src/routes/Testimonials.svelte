<script lang="ts">
	import CTA from './CTA.svelte';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { APP_NAME } from '$lib/config/constants';
	import { Head } from 'svead';
	import { page } from '$app/stores';
	const props = {
		url: $page.url.toString(),
		title: 'Home page of the boilerplate.',
		description: 'Sveltekit boilerplate, a uncomplicated awesome way to kickstart your projects.',
		authorName: 'JSJG',
		website: 'https://jsjg.pro'
	};
</script>

<section class="bg-background dark:bg-gray-900">
	<div class="mx-auto max-w-screen-xl px-4 py-8 text-center lg:px-6 lg:py-16">
		<figure class="mx-auto max-w-screen-md">
			<svg
				class="mx-auto mb-3 h-12 text-gray-400 dark:text-gray-600"
				viewBox="0 0 24 27"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
					fill="currentColor"
				/>
			</svg>
			<blockquote>
				<p class="text-2xl font-medium text-gray-900 dark:text-white">
					I am relatively new to Svelte, so this project has been an excellent learning resource.
					The code is well-structured and the use of modern tools like Drizzle and Lucia has
					introduced me to best practices. I did struggle a bit with setting up the email features,
					but the community support was helpful. It's been a great foundation for building my first
					major Svelte application.
				</p>
			</blockquote>
			<figcaption class="mt-6 flex items-center justify-center space-x-3">
				<img
					class="h-6 w-6 rounded-full"
					src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
					alt="profile"
				/>
				<div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
					<div class="pr-3 font-medium text-gray-900 dark:text-white">Jeffrey</div>
					<div class="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">from WaterShip</div>
				</div>
			</figcaption>
		</figure>
	</div>
</section>
