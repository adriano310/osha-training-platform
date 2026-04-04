import { Resend } from "resend";

type NullableString = string | null;

type ContactEmailPayload = {
  contactCode: NullableString;
  name: string;
  email: string;
  phone: NullableString;
  company: NullableString;
  location: NullableString;
  topic: NullableString;
  preferredContact: string;
  message: string;
  submittedAt: Date;
};

type BookingEmailPayload = {
  bookingCode: NullableString;
  companyName: string;
  contactName: string;
  email: string;
  phone: NullableString;
  service: string;
  preferredDate: Date;
  employeeCount: number;
  city: string;
  state: string;
  message: NullableString;
  category: NullableString;
  locationType: NullableString;
  address: NullableString;
  zip: NullableString;
  timeWindow1: NullableString;
  date2: NullableString;
  timeWindow2: NullableString;
  submittedAt: Date;
};

const resendApiKey = process.env.RESEND_API_KEY;
const emailFrom = process.env.EMAIL_FROM;
const adminRecipients = (process.env.ADMIN_EMAIL || "")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

const resend = resendApiKey ? new Resend(resendApiKey) : null;

function formatDate(value: Date): string {
  return value.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isEmailConfigured(): boolean {
  return Boolean(resend && emailFrom);
}

function hasPlaceholderSender(): boolean {
  if (!emailFrom) {
    return false;
  }
  return /@yourdomain\.com/i.test(emailFrom);
}

async function sendTextEmail({
  to,
  subject,
  text,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (!isEmailConfigured()) {
    console.warn("Email provider not configured. Skipping outbound emails.");
    return;
  }

  if (hasPlaceholderSender()) {
    throw new Error(
      "EMAIL_FROM is using a placeholder domain. Use a verified domain (or onboarding@resend.dev for testing).",
    );
  }

  const result = await resend!.emails.send({
    from: emailFrom!,
    to,
    subject,
    text,
    replyTo,
  });

  if (result.error) {
    throw new Error(`Resend rejected email: ${result.error.message}`);
  }

  if (result.data?.id) {
    console.info(`Email queued: ${result.data.id} (${subject})`);
  }
}

export async function sendContactEmails(
  payload: ContactEmailPayload,
): Promise<PromiseSettledResult<void>[]> {
  const code = payload.contactCode || "pending";

  const userSubject = `We received your contact request (${code})`;
  const userText = [
    `Hi ${payload.name},`,
    "",
    "Thanks for contacting Safety 101.",
    `Your reference code is ${code} and we received your request on ${formatDate(payload.submittedAt)}.`,
    "",
    "We will follow up as soon as possible.",
    "",
    "Safety 101 Team",
  ].join("\n");

  const adminSubject = `New contact submission ${code}`;
  const adminText = [
    `Code: ${code}`,
    `Submitted: ${formatDate(payload.submittedAt)}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "N/A"}`,
    `Company: ${payload.company || "N/A"}`,
    `Location: ${payload.location || "N/A"}`,
    `Topic: ${payload.topic || "N/A"}`,
    `Preferred Contact: ${payload.preferredContact}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const sends: Array<Promise<void>> = [
    sendTextEmail({ to: payload.email, subject: userSubject, text: userText }),
  ];

  if (adminRecipients.length > 0) {
    sends.push(
      sendTextEmail({
        to: adminRecipients,
        subject: adminSubject,
        text: adminText,
        replyTo: payload.email,
      }),
    );
  }

  return Promise.allSettled(sends);
}

export async function sendBookingEmails(
  payload: BookingEmailPayload,
): Promise<PromiseSettledResult<void>[]> {
  const code = payload.bookingCode || "pending";

  const userSubject = `We received your booking request (${code})`;
  const userText = [
    `Hi ${payload.contactName},`,
    "",
    "Thanks for booking training with Safety 101.",
    `Your booking reference code is ${code}.`,
    `Preferred date: ${formatDate(payload.preferredDate)}.`,
    "",
    "We will contact you shortly to confirm availability.",
    "",
    "Safety 101 Team",
  ].join("\n");

  const adminSubject = `New booking submission ${code}`;
  const adminText = [
    `Code: ${code}`,
    `Submitted: ${formatDate(payload.submittedAt)}`,
    `Company: ${payload.companyName}`,
    `Contact: ${payload.contactName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone || "N/A"}`,
    `Service: ${payload.service}`,
    `Category: ${payload.category || "N/A"}`,
    `Employees: ${payload.employeeCount}`,
    `Preferred Date: ${formatDate(payload.preferredDate)}`,
    `Location: ${payload.city}, ${payload.state}`,
    `Location Type: ${payload.locationType || "N/A"}`,
    `Address: ${payload.address || "N/A"}`,
    `Zip: ${payload.zip || "N/A"}`,
    `Time Window 1: ${payload.timeWindow1 || "N/A"}`,
    `Date 2: ${payload.date2 || "N/A"}`,
    `Time Window 2: ${payload.timeWindow2 || "N/A"}`,
    "",
    "Message:",
    payload.message || "N/A",
  ].join("\n");

  const sends: Array<Promise<void>> = [
    sendTextEmail({ to: payload.email, subject: userSubject, text: userText }),
  ];

  if (adminRecipients.length > 0) {
    sends.push(
      sendTextEmail({
        to: adminRecipients,
        subject: adminSubject,
        text: adminText,
        replyTo: payload.email,
      }),
    );
  }

  return Promise.allSettled(sends);
}
