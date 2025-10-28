import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Event from "@/database/event.model";
import { IEvent } from "@/database/event.model";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/events/[slug]
 * Fetches a single event by its slug
 *
 * @param request - Next.js request object
 * @param params - Route parameters containing the slug
 * @returns JSON response with event data or error message
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    // Resolve the params Promise to get the slug
    const { slug } = await params;

    // Validate slug parameter
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Slug parameter is required and must be a string",
        },
        { status: 400 }
      );
    }

    // Validate slug format (basic validation for URL-friendly strings)
    if (!/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid slug format. Slug must contain only lowercase letters, numbers, and hyphens",
        },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Find event by slug
    const event: IEvent | null = await Event.findOne({ slug });

    // Check if event exists
    if (!event) {
      return NextResponse.json(
        {
          success: false,
          message: `Event with slug '${slug}' not found`,
        },
        { status: 404 }
      );
    }

    // Return successful response with event data
    return NextResponse.json(
      {
        success: true,
        message: "Event fetched successfully",
        event,
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error for debugging
    console.error("Error fetching event by slug:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while fetching event",
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
