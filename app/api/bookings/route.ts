import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const lastBooking = await prisma.booking.findFirst({
      where: {
        bookingCode: {
          not: null,
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
      select: {
        bookingCode: true,
      },
    });
    let nextNumber = 1001;
    if (lastBooking && lastBooking.bookingCode) {
      const match = lastBooking.bookingCode.match(/B(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    const bookingCode = `B${nextNumber}`;
    const booking = await prisma.booking.create({
      data: {
        companyName: data.company,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        preferredDate: new Date(data.preferredDate),
        employeeCount: Number(data.employeeCount),
        city: data.city,
        state: data.state,
        message: data.message || null,
        category: data.category || null,
        serviceSlug: data.serviceSlug || null,
        locationType: data.locationType || null,
        address: data.address || null,
        zip: data.zip || null,
        timeWindow1: data.timeWindow1 || null,
        date2: data.date2 || null,
        timeWindow2: data.timeWindow2 || null,
        additionalNotes: null,
        status: "New",
        bookingCode,
      },
    });
    return NextResponse.json({ success: true, booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 400 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json({ success: true, bookings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || "Unknown error" }, { status: 500 });
  }
}
