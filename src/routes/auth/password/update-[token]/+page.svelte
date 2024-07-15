<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { type UserUpdatePasswordSchema } from '$lib/config/zod-schemas';
	import { Loader2, AlertCircle } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';

	let data: { form: SuperValidated<UserUpdatePasswordSchema> } = { form: $page.data.UpdatePasswordForm };
	const form = superForm(data.form);
	const { form: formData, enhance, delayed } = form;
</script>

<div class="flex flex-col items-center justify-center mx-auto max-w-2xl">
	<Button class="m-4" on:click={() => goto('/')}>Back to Home</Button>
	<form method="POST" use:enhance>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Change Your Password</Card.Title>
				<Card.Description>Choose a new password for your account.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>New Password</Form.Label>
						<Input {...attrs} type="password" name={attrs.name} bind:value={$formData.password} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="confirmPassword">
					<Form.Control let:attrs>
						<Form.Label>Confirm New Password</Form.Label>
						<Input {...attrs} type="password" name={attrs.name} bind:value={$formData.confirmPassword} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<Form.Button class="w-full" disabled={$delayed}
					>{#if $delayed}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait{:else}Update Password{/if}
				</Form.Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
