<script lang="ts">
	import { page } from '$app/stores';
	import { APP_NAME } from '$lib/config/constants';
	import * as Card from '$lib/components/ui/card';
	export let token = $page.data;
</script>

<section
	class="container flex h-4/5 flex-wrap content-center items-center justify-center gap-6 py-48"
>
	<Card.Root>
		<Card.Header>
			<Card.Title>Confirm Your Email Address</Card.Title>
		</Card.Header>
		<Card.Content>
			<p class="max-w-[700px] text-lg text-muted-foreground">
				Please check your email account for a message to confirm your email address for {APP_NAME}.
				If you did not receive the email,
				<a href="/auth/verify/resend-email-{encodeURIComponent(token.user.email)}" class="underline"
					>click here</a
				> to resend it.
			</p>
		</Card.Content>
	</Card.Root>
</section>
