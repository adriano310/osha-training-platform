import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureAdminApiAuth } from "@/lib/adminAuth";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  const unauthorized = await ensureAdminApiAuth();
  if (unauthorized) return unauthorized;

  const params = 'then' in context.params ? await context.params : context.params;
  const id = params.id;

  const contact = await prisma.contactSubmission.findFirst({
    where: {
      OR: [
        { contactCode: id },
        { id: id },
      ],
    },
  });
  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }
  return NextResponse.json(contact);
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> | { id: string } }) {
  const unauthorized = await ensureAdminApiAuth();
  if (unauthorized) return unauthorized;

  const params = 'then' in context.params ? await context.params : context.params;
  const id = params.id;

  const body = await req.json();
  const { status, additionalNotes } = body;

  const contact = await prisma.contactSubmission.findFirst({
    where: {
      OR: [
        { contactCode: id },
        { id: id },
      ],
    },
  });

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  const updated = await prisma.contactSubmission.update({
    where: { id: contact.id },
    data: {
      ...(status !== undefined && { status }),
      ...(additionalNotes !== undefined && { additionalNotes }),
    },
  });

  return NextResponse.json({ success: true, contact: updated });
}
