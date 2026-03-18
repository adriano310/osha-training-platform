import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id?: string }> }) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing booking id in URL." }, { status: 400 });
    }
    const body = await req.json();
    // Only update fields that are provided
    const data: any = {};
    if (body.status !== undefined) data.status = body.status;
    if (body.additionalNotes !== undefined) data.additionalNotes = body.additionalNotes;
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ success: false, error: "No valid fields to update." }, { status: 400 });
    }
    const booking = await prisma.booking.update({
      where: { id },
      data,
    });
    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 400 });
  }
}
