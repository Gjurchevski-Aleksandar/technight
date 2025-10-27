// Centralized export for all database models
export { default as Event } from './event.model';
export { default as Booking } from './booking.model';

// Export TypeScript interfaces
export type { IEvent } from './event.model';
export type { IBooking } from './booking.model';

// Export helper functions
export { validateEmail } from './booking.model';
export { formatEventDate, parseEventTime } from './event.model';
