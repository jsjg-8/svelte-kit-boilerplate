<script lang="ts">
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

<!-- Call to Action Section -->
<section class="bg-gray-900 py-12 text-white md:py-24">
	<div class="container mx-auto grid items-center gap-6 px-4 text-center">
		<h2 class="text-3xl font-bold md:text-4xl">Get Started with {APP_NAME} Today</h2>
		<p class="mt-2 text-lg md:text-xl">
			Join the community of developers using this boilerplate to build amazing projects.
		</p>
		<div class="mt-6 flex justify-center gap-4">
			<Button class=" border" on:click={() => goto('/auth/sign-in')}>Sign in</Button>
			<Button variant="outline" class="text-foreground" on:click={() => goto('/auth/sign-up')}
				>Sign up</Button
			>
		</div>
	</div>
</section>
