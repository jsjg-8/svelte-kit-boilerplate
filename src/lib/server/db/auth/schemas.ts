import { pgTable, text, timestamp, boolean, numeric } from 'drizzle-orm/pg-core';

export const userTable = pgTable('users', {
	id: text('id').notNull().primaryKey(),
	provider: text('provider').notNull().default('email'),
	providerId: text('provider_id').notNull().default(''),
	email: text('email').notNull().unique(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	role: text('role').notNull().default('USER'),
	verified: boolean('verified').notNull().default(false),
	receiveEmail: boolean('receive_email').notNull().default(true),
	password: text('password'),
	token: text('token').unique(),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull(),
	updatedAt: timestamp('updated_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const sessionTable = pgTable('sessions', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export const subscriptionTable = pgTable('subscriptions', {
	subscriptionId: text('subscription_id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	startDate: timestamp('start_date', { mode: 'date' }).notNull(),
	endDate: timestamp('end_date', { mode: 'date' }).notNull()
});

export const paymentTable = pgTable('payments', {
	paymentId: text('payment_id').notNull().primaryKey(),
	subscriptionId: text('subscription_id')
		.notNull()
		.references(() => subscriptionTable.subscriptionId),
	amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
	paymentDate: timestamp('payment_date', { mode: 'date' }).notNull()
});

export type User = typeof userTable.$inferInsert;
export type UpdateUser = Partial<typeof userTable.$inferInsert>;
export type Session = typeof sessionTable.$inferInsert;
export type Subscription = typeof subscriptionTable.$inferInsert;
export type Payment = typeof paymentTable.$inferInsert;
