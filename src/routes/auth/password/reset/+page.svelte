<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { userSchema } from '$lib/config/zod-schemas';
	import { superForm } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import Input from '$lib/components/ui/input/input.svelte';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';

	const resetPasswordSchema = userSchema.pick({
		email: true
	});

	type ResetPasswordSchema = Infer<typeof resetPasswordSchema>;

	let data: { form: SuperValidated<ResetPasswordSchema> } = { form: $page.data.form };
	const form = superForm(data.form, {
		delayMs: 100,
		timeoutMs: 8000,
		multipleSubmits: 'prevent'
	});
	const { form: formData, enhance, delayed, timeout } = form;
</script>

<div class="mx-auto flex h-screen max-w-2xl items-center justify-center">
	<form method="POST" use:enhance>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Reset Your Password</Card.Title>
				<Card.Description>Receive email instructions to reset your password.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.email} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<div class="w-full">
					<Form.Button class="w-full" disabled={$delayed}
						>{#if $delayed}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
							Please wait{:else}Send Password Reset Email{/if}
					</Form.Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
