<script lang="ts">
	import { page } from '$app/stores';
	import { APP_NAME } from '$lib/assets/constants.js';
	import * as Card from '$lib/components/ui/card';
	export let token = $page.data;
	console.log(token)
	// <div class="flex max-w-[980px] h-screen flex-col items-center gap-2">
	// 	<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
	// 		Confirm Your Email Address
	// 	</h1>
	// </div>
</script>

<section class="container  h-4/5 flex flex-wrap content-center items-center justify-center py-48 gap-6">
	<Card.Root>
		<Card.Header>
			<Card.Title>Confirm Your Email Address</Card.Title>
		</Card.Header>
		<Card.Content>
			<p class="max-w-[700px] text-lg text-muted-foreground">
				Please check your email account for a message to confirm your email address for {APP_NAME}.
				If you did not receive the email,
				<a href="/auth/verify/resend-email-{encodeURIComponent(token.user.email)}" class="underline">click here</a> to resend it.		</p>
		</Card.Content>
	</Card.Root>
</section>