<script lang="ts">
	import Testimonials from './Testimonials.svelte';

	import CTA from './CTA.svelte';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { APP_NAME } from '$lib/config/constants';
	import { Head } from 'svead';
	import { page } from '$app/stores';
	import { Badge } from '@/components/ui/badge';

	const props = {
		url: $page.url.toString(),
		title: 'Home page of the boilerplate.',
		description: 'Sveltekit boilerplate, a uncomplicated awesome way to kickstart your projects.',
		authorName: 'JSJG',
		website: 'https://jsjg.pro'
	};

	type Features = {
		title: string;
		content: string;
		icon?: any;
		imglink?: string;
	};
	const cards: Features[] = [
		{
			title: 'Authentication',
			content:
				"Utilizes <a href='https://lucia-auth.com/' class='underline'>Lucia</a> for robust authentication.",
			imglink: '<img src="lucia_auth.jpg" alt="lucia logo" width=24>'
		},
		{
			title: 'UI Elements',
			content:
				"Built with beautiful <a href='https://www.shadcn-svelte.com' class='underline'>shadcn-svelte</a> components.",
			imglink:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="h-6 w-6"><rect width="256" height="256" fill="none"></rect><line x1="208" y1="128" x2="128" y2="208" fill="none" stroke="#EB4F27" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="192" y1="40" x2="40" y2="192" fill="none" stroke="#EB4F27" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>'
		},
		{
			title: 'Database Connectivity',
			content:
				"Uses <a href='https://orm.drizzle.team/' class='underline'>Drizzle</a> for type-safe database connectivity.",
			imglink:
				'<svg width="48" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="5.41766" height="22.979" transform="matrix(0.873028 0.48767 -0.497212 0.867629 24.459 24.3583)" fill="black"/><rect width="5.41766" height="22.979" transform="matrix(0.873028 0.48767 -0.497212 0.867629 43.2793 12.6755)" fill="black"/><rect width="5.41766" height="22.979" transform="matrix(0.873028 0.48767 -0.497212 0.867629 72.2383 12.676)" fill="black"/><rect width="5.41766" height="22.979" transform="matrix(0.873028 0.48767 -0.497212 0.867629 53.4121 24.3583)" fill="black"/></svg>'
		},
		{
			title: 'Form Management',
			content:
				"Integrated with <a href='https://superforms.rocks/' class='underline'>Superforms</a> for easy form handling.",
			imglink: '<img src="superforms.svg"  alt="superforms logo" width=24>'
		},
		{
			title: 'Schema Validation',
			content:
				"Ensures data integrity with <a href='https://zod.dev/' class='underline'>Zod</a> schema validation.",
			imglink: '<img src="https://zod.dev/logo.svg"  alt="zod logo" width=24>'
		},
		{
			title: 'Icons',
			content:
				"Includes a wide range of icons from <a href='https://lucide.dev/' class='underline'>Lucide</a>.",
			imglink: '<img src="https://lucide.dev/logo.light.svg"  alt="lucide icons logo" width=24>'
		}
	];
	const qa = [
		{
			question: 'How do I get started?',
			answer:
				'Check out the <a href="https://github.com/jsjg-8/svelte-kit-boilerplate" class="underline">GitHub repository</a> for instructions on how to set up the project.</p>'
		},
		{
			question: 'What authentication system does this project use?',
			answer:
				'This project utilizes Lucia for authentication. Lucia is a flexible and robust authentication library that provides a solid foundation for handling user authentication in modern web applications.'
		},
		{
			question: 'Can I customize the UI components?',
			answer:
				"Yes, absolutely! The project uses shadcn-svelte for UI components, which are designed to be easily customizable. You can modify colors, sizes, and styles to match your project's design requirements."
		},
		{
			question: 'What database does this project support?',
			answer:
				'The project uses Drizzle ORM, which supports multiple databases including PostgreSQL, MySQL, and SQLite. Drizzle provides type-safe database interactions, making it easier to work with your data.'
		},
		{
			question: 'How does form handling work in this project?',
			answer:
				'Form management is handled using Superforms and Zod. Superforms provides a comprehensive solution for form handling in SvelteKit, while Zod is used for schema validation, ensuring that your form data is always valid and type-safe.'
		},
		{
			question: 'Does this project support email functionality?',
			answer:
				"Yes, the project includes support for various email features including email verification, password reset, and email re-verification on changes. It's compatible with several email services including Mailtrap, Amazon SES, Mailgun, and standard SMTP."
		},
		{
			question: 'Is there support for user roles?',
			answer:
				'Yes, the project implements a user role system. This allows you to assign different permissions and access levels to users based on their roles.'
		},
		{
			question: 'Can users edit their own profiles?',
			answer:
				'Absolutely! The project includes functionality for users to edit their profiles, including changing their email addresses and passwords.'
		},
		{
			question: 'Does the project support different themes?',
			answer:
				'Yes, the project supports both light and dark modes out of the box. You can easily switch between these themes or customize them further to suit your needs.'
		},
		{
			question: 'Is there a logging system included?',
			answer:
				'Yes, the project integrates an error logging system using Axiom. This helps you track and manage errors effectively in your application.'
		},
		{
			question: 'Does the project support OAuth?',
			answer:
				'Yes, the project includes an example of Google OAuth login. You can use this as a starting point to implement other OAuth providers as needed.'
		},
		{
			question: 'How does the project perform in terms of speed and optimization?',
			answer:
				'The project is optimized for performance and achieves excellent scores on Google PageSpeed Insights. This ensures that your application will load quickly and provide a smooth user experience.'
		}
	];
</script>

<Head
	url={props.url}
	title={props.title}
	description={props.description}
	authorName={props.authorName}
	website={props.website}
/>

<div class="flex-1">
	<!-- Hero Section -->
	<section class=" bg-background py-12 md:py-24">
		<div class="container mx-auto grid items-center gap-6 px-4">
			<div class="mx-auto max-w-2xl text-center">
				<h1
					class="bg-background text-4xl font-extrabold leading-tight tracking-tighter text-popover-foreground md:text-5xl"
				>
					{APP_NAME}
				</h1>
				<p class="mt-4 text-lg text-gray-700 md:text-xl">
					A SvelteKit auth starter project with modern tools and best practices.
				</p>
				<div class="mt-6 flex justify-center gap-4">
					<Button on:click={() => goto('/auth/sign-in')}>Sign in</Button>
					<Button variant="secondary" on:click={() => goto('/auth/sign-up')}>Sign up</Button>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="bg-primary-foreground py-12 md:py-24">
		<div class="text-center"><Badge variant="secondary">Why Choose this?</Badge></div>
		<div class="container mx-auto grid justify-center gap-12 px-4">
			<div class="text-center">
				<h2 class="text-4xl font-bold md:text-4xl">Features</h2>
				<p class="mt-2 text-lg text-muted-foreground md:text-xl">
					Everything you need to get started with SvelteKit.
				</p>
			</div>

			<div class="grid max-w-5xl gap-12 md:grid-cols-3">
				{#each cards as card}
					<Card.Root
						class=" border-none shadow-none hover:bg-primary hover:text-primary-foreground hover:shadow-md"
					>
						<Card.Header>
							<div
								class="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground text-blue-500 hover:bg-primary hover:text-white"
							>
								<svelte:component this={card.icon} size={24} />
								<div>
									{#if card.imglink}{@html card.imglink}{/if}
								</div>
							</div>
							<Card.Title>{card.title}</Card.Title>
						</Card.Header>
						<Card.Content>
							<p>{@html card.content}</p>
						</Card.Content>
					</Card.Root>
				{/each}
			</div>
		</div>
	</section>

	<!-- Testimonials Section -->
	<Testimonials />

	<!-- FAQ Section -->
	<section class="bg-background py-12 text-foreground md:py-24">
		<div class="container mx-auto grid gap-12 px-4">
			<div class="text-center">
				<h2 class="text-3xl font-bold text-popover-foreground md:text-4xl">
					Frequently Asked Questions
				</h2>
				<p class="mt-2 text-lg text-gray-700 md:text-xl">Common questions about the boilerplate.</p>
			</div>
			<Accordion.Root class="mx-auto w-full sm:max-w-[70%]">
				{#each qa as { question, answer }}
					<Accordion.Item value={question}>
						<Accordion.Trigger>{question}</Accordion.Trigger>
						<Accordion.Content>
							<p>{@html answer}</p>
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</div>
	</section>

	<CTA />
</div>
