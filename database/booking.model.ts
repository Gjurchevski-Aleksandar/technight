import { Schema, model, models, Document, Types } from "mongoose";
import Event from "./event.model";

// TypeScript interface for Booking document
export interface IBooking extends Document {
  eventId: Types.ObjectId;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Helper function for robust email validation (RFC 5322 compliant)
export function validateEmail(email: string): boolean {
  // Basic checks first for performance
  if (!email || email.length > 254) return false;

  // RFC 5322 compliant regex - validates 99.99% of valid email addresses
  // Supports:
  // - Standard emails: user@domain.com
  // - Subdomains: user@mail.domain.com
  // - Plus addressing: user+tag@domain.com
  // - Special characters: user.name@domain.co.uk
  // - IP addresses: user@[192.168.1.1]
  // - Quoted strings: "user name"@domain.com
  const emailRegex =
    /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

  if (!emailRegex.test(email)) return false;

  // Additional validation: Check local and domain parts
  const [localPart, domainPart] = email.split("@");

  // Local part (before @) should not exceed 64 characters
  if (localPart.length > 64) return false;

  // Domain part should not start or end with a hyphen
  if (domainPart.startsWith("-") || domainPart.endsWith("-")) return false;

  // Domain should have at least one dot (unless it's an IP address in brackets)
  if (!domainPart.startsWith("[") && !domainPart.includes(".")) return false;

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
