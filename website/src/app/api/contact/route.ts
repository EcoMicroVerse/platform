import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ||
  "contact@ecomicroverse.bio";

const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "contact@ecomicroverse.bio";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return null;
  }

  return new Resend(apiKey);
}

export async function POST(request: Request) {
  try {
    const resend = getResendClient();

    if (!resend) {
      return NextResponse.json(
        {
          error:
            "The contact service is not configured yet. Please try again later.",
        },
        { status: 503 }
      );
    }

    const formData = await request.formData();

    const name =
      String(formData.get("name") || "").trim();

    const email =
      String(formData.get("email") || "").trim();

    const type =
      String(formData.get("type") || "").trim();

    const subject =
      String(formData.get("subject") || "").trim();

    const message =
      String(formData.get("message") || "").trim();

    const honeypot =
      String(formData.get("website") || "").trim();

    if (honeypot) {
      return NextResponse.json({
        success: true,
      });
    }

    if (
      !name ||
      !email ||
      !type ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          error:
            "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: "Name is too long." },
        { status: 400 }
      );
    }

    if (email.length > 200) {
      return NextResponse.json(
        { error: "Email address is too long." },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { error: "Subject is too long." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 }
      );
    }

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[EcoMicroVerse] ${type}: ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Enquiry type: ${type}`,
        "",
        `Subject: ${subject}`,
        "",
        message,
      ].join("\n"),
    });

    if (result.error) {
      console.error(
        "Contact email error:",
        result.error
      );

      return NextResponse.json(
        {
          error:
            "The message could not be sent. Please try again later.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "The message could not be sent. Please try again later.",
      },
      { status: 500 }
    );
  }
}