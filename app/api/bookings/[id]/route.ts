import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApiAuth } from "@/lib/adminAuth";

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unknown error";
}

export async function GET(req: NextRequest, context: { params: Promise<{ id?: string }> }) {
  try {
    const unauthorized = await ensureAdminApiAuth();
    if (unauthorized) return unauthorized;

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing booking id in URL." }, { status: 400 });
    }
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { bookingCode: id },
          { id },
        ],
      },
    });
    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, booking });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id?: string }> }) {
  try {
    const unauthorized = await ensureAdminApiAuth();
    if (unauthorized) return unauthorized;

    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing booking id in URL." }, { status: 400 });
    }
    const booking = await prisma.booking.findFirst({
      where: {
        OR: [
          { bookingCode: id },
          { id },
        ],
      },
    });
    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found." }, { status: 404 });
    }
    const body = await req.json();
    const data: { status?: string; additionalNotes?: string | null } = {};
    if (body.status !== undefined) data.status = body.status;
    if (body.additionalNotes !== undefined) data.additionalNotes = body.additionalNotes;
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: "No valid fields to update." }, { status: 400 });
    }
    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data,
    });
    return NextResponse.json({ success: true, booking: updated });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getErrorMessage(error) }, { status: 400 });
  }
}
