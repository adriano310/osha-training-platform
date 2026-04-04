import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendContactEmails } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!data.name || !data.email || !data.message || !data.preferredContact) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const last = await prisma.contactSubmission.findFirst({
      where: { contactCode: { not: null } },
      orderBy: { submittedAt: "desc" },
      select: { contactCode: true },
    });
    let nextNumber = 1001;
    if (last?.contactCode) {
      const match = last.contactCode.match(/^C(\d+)$/);
      if (match) {
        nextNumber = parseInt(match[1], 10) + 1;
      }
    }
    const contactCode = `C${nextNumber}`;

    const contact = await prisma.contactSubmission.create({
      data: {
        contactCode,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        location: data.location || null,
        topic: data.topic || null,
        preferredContact: data.preferredContact,
        message: data.message,
        status: "New",
      },
    });

    const emailResults = await sendContactEmails({
      contactCode: contact.contactCode,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      location: contact.location,
      topic: contact.topic,
      preferredContact: contact.preferredContact,
      message: contact.message,
      submittedAt: contact.submittedAt,
    });
    const failedEmails = emailResults.filter((result) => result.status === "rejected");
    if (failedEmails.length > 0) {
      console.error("Contact emails failed", failedEmails);
    }

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit contact." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const contacts = await prisma.contactSubmission.findMany({
      orderBy: { submittedAt: "desc" },
    });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
