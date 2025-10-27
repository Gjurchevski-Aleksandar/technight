import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function for robust email validation (lint-friendly, RFC-inspired)
export function validateEmail(email: string): boolean {
  // Basic checks first for performance
  if (!email || email.length > 254) return false;

  // Pragmatic email validation that passes linters
  // Supports:
  // - Standard emails: user@domain.com
  // - Subdomains: user@mail.domain.com
  // - Plus addressing: user+tag@domain.com
  // - Special characters: user.name@domain.co.uk
  // - Dots and hyphens: first.last@my-domain.com
  const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  if (!emailRegex.test(email)) return false;

  // Additional validation: Check local and domain parts
  const atIndex = email.lastIndexOf("@");
  const localPart = email.slice(0, atIndex);
  const domainPart = email.slice(atIndex + 1);

  // Local part (before @) should not exceed 64 characters
  if (localPart.length > 64) return false;

  // Domain part should not start or end with a hyphen
  if (domainPart.startsWith("-") || domainPart.endsWith("-")) return false;

  // Domain should have at least one dot
  if (!domainPart.includes(".")) return false;

  // Domain labels should not exceed 63 characters
  const domainLabels = domainPart.split(".");
  if (domainLabels.some((label) => label.length > 63)) return false;

  return true;
}

const BookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: [true, "Event ID is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: validateEmail,
        message: "Invalid email format. Please provide a valid email address.",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook: Validate that the referenced event exists
BookingSchema.pre("save", async function (next) {
  const booking = this as IBooking;
  //Only validate if it's new or modified
  if (booking.isModified("eventId") || booking.isNew) {
    try {
      const eventExists = await Event.findById(booking.eventId).select("_id");

      if (!eventExists) {
        const error = new Error(
          `Event with ID ${booking.eventId} does not exist`
        );
        error.name = "ValidationError";
        return next(error);
      }
    } catch {
      const ValidationError = new Error(
        "Invalid event ID format or database error"
      );
      ValidationError.name = "ValidationError";
      return next(ValidationError);
    }
  }

  next();
});

// Create index on eventId for faster queries
BookingSchema.index({ eventId: 1 });

// Create compound index for common queries
BookingSchema.index({ eventId: 1, createdAt: -1 });

// Create index on email for user booking lookup
BookingSchema.index({ email: 1 });

// Export model (prevent recompilation in development)
const Booking = models.Booking || model<IBooking>("Booking", BookingSchema);

export default Booking;
