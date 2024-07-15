import { z } from 'zod';
import { type Infer } from 'sveltekit-superforms';
export const signInSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim()
});

export type SignInSchema = Infer<typeof signInSchema>;

export const signUpSchema = z.object({
	firstName: z
		.string({ required_error: 'First Name is required' })
		.min(1, { message: 'First Name is required' })
		.trim(),
	lastName: z
		.string({ required_error: 'Last Name is required' })
		.min(1, { message: 'Last Name is required' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Please enter a valid email address' }),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be at least 6 characters' })
		.trim(),
	terms: z.literal<boolean>(true, {
		errorMap: () => ({ message: 'You must accept the terms & privacy policy' })
	})
});

export type SignUpSchema = Infer<typeof signUpSchema>;
