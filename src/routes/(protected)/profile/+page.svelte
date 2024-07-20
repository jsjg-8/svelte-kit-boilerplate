<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { type UserSchema  } from '$lib/config/zod-schemas';
	import { type SuperValidated, superForm } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { page } from '$app/stores';

	let data: { form: SuperValidated<UserSchema> } = { form: $page.data.form };
	const form = superForm(data.form);

	const { form: formData, enhance, delayed } = form;
</script>

<div class="mx-auto flex max-w-2xl items-center justify-center">
	<form method="POST" use:enhance>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Profile</Card.Title>
				<Card.Description>Update your profile settings below.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.firstName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.lastName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.email} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<div class="block w-full">
					<Form.Button class="w-full" disabled={$delayed}>
						{#if $delayed}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Please wait
						{:else}
							Update profile
						{/if}
					</Form.Button>
					<div class="mt-6 text-center text-sm">
						<a href="/auth/password/reset" class="underline">Change your password</a>
					</div>
				</div>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
