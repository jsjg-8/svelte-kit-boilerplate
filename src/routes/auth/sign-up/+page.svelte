<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { type SignUpSchema } from '../schema';
	import SuperDebug, { superForm, type SuperValidated } from 'sveltekit-superforms';
	import { Loader2 } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import Input from '$lib/components/ui/input/input.svelte';
	import { page } from '$app/stores';
	import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte';

	let data: { form: SuperValidated<SignUpSchema> } = { form: $page.data.Signupform };

	const form = superForm(data.form);
	$: checked = true;
	const { form: formData, enhance, delayed } = form;
</script>

<div class="mx-auto flex max-w-2xl flex-col items-center justify-center">
	<Button class="m-4" on:click={() => goto('/auth/oauth/google')}>Sign up with Google</Button>
	<form method="POST" use:enhance>
		<Card.Root>
			<Card.Header class="space-y-1">
				<Card.Title class="text-2xl">Create an account</Card.Title>
				<Card.Description
					>Already have an account? <a href="/auth/sign-in" class="underline">Sign in here.</a
					></Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<Form.Field {form} name="firstName">
					<Form.Control let:attrs>
						<Form.Label>First Name</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.firstName} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="lastName">
					<Form.Control let:attrs>
						<Form.Label>Last Name</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.lastName} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="email">
					<Form.Control let:attrs>
						<Form.Label>Email</Form.Label>
						<Input {...attrs} name={attrs.name} bind:value={$formData.email} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" name={attrs.name} bind:value={$formData.password} />
						<Form.FieldErrors />
					</Form.Control>
				</Form.Field>
				<Form.Field
					{form}
					class="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4"
					name="terms"
				>
					<Form.Control let:attrs>
						<Checkbox {...attrs} bind:checked={$formData.terms} />
						<div class="space-y-1 leading-none">
							<Form.Label>I Accept the terms and privacy policy.</Form.Label>
							<Form.Description>
								You agree to the <a href="/terms" class="text-primaryHover underline">terms</a> and
								<a href="/privacy" class="text-primaryHover underline">privacy policy</a>.
							</Form.Description>
						</div>
						<input name={attrs.name} value={checked} hidden />
					</Form.Control>
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<Form.Button class="w-full" disabled={$delayed}
					>{#if $delayed}
						<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						Please wait{:else}Sign Up{/if}
				</Form.Button>
			</Card.Footer>
		</Card.Root>
		<SuperDebug data={$formData} />
	</form>
</div>
