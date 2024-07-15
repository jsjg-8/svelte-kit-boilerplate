<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';

	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';
	import { page } from '$app/stores';
	import { type SignInSchema } from '../schema';

	import Input from '$lib/components/ui/input/input.svelte';

	let data: { loginForm: SuperValidated<SignInSchema> } = { loginForm: $page.data.loginForm };
	const form = superForm(data.loginForm);

	const { form: formData, enhance , delayed } = form;
</script>

<div class="flex flex-col h-screen items-center justify-center mx-auto max-w-2xl">
	<form method="POST" use:enhance>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Sign in</Card.Title>
				<Card.Description
					>Don't have an account yet? <a href="/auth/sign-up" class="underline">Sign up here.</a
					></Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>E-mail</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} name={attrs.name} type={attrs.name} bind:value={$formData.password} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<div class="block w-full">
					<Form.Button class="w-full" disabled={$delayed}
						>{#if $delayed}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Please wait{:else}Sign In{/if}
					</Form.Button>
					<div class="mt-6 text-center text-sm">
						<a href="/auth/password/reset" class="underline">Forgot your password?</a>
					</div>
				</div>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
