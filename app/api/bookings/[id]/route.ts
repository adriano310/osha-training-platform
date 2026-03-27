import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, context: { params: Promise<{ id?: string }> }) {
  try {
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
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id?: string }> }) {
  try {
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
    const data: any = {};
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
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 400 });
  }
}
