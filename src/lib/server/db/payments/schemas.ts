import { pgTable, text, timestamp, numeric } from 'drizzle-orm/pg-core';
import { userTable } from '../auth/schemas';

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

export type Subscription = typeof subscriptionTable.$inferInsert;
export type Payment = typeof paymentTable.$inferInsert;
