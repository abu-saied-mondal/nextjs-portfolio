import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { addMessage, getMessages, deleteMessage } from "@/lib/db";

// Helper to check authentication
async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === "portfolio-admin-session-token";
}

// GET: Fetch all contact messages (Admin Only)
export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const messages = await getMessages();
    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Submit a new contact message (Public)
export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // 1. Save to DB/file (so it's guaranteed visible in the admin panel)
    const savedMessage = await addMessage({ name, email, message });

    // 2. Attempt to email the message
    let emailSent = false;
    let emailError = null;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const receiverEmail = process.env.RECEIVER_EMAIL || "abumondal990@gmail.com";

        await transporter.sendMail({
          from: `"${name}" <${process.env.EMAIL_USER}>`, // Safe sender
          replyTo: email,
          to: receiverEmail,
          subject: `Portfolio Message from ${name}`,
          html: `
            <h2>New Portfolio Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
            <p><em>This message has also been saved to your admin dashboard.</em></p>
          `,
        });
        emailSent = true;
      } catch (err) {
        console.error("Email send failed inside API:", err);
        emailError = err.message;
      }
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS environment variables are missing; email sending skipped.");
      emailError = "SMTP credentials missing";
    }

    return NextResponse.json({ 
      success: true, 
      message: savedMessage,
      emailSent,
      emailError
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a contact message (Admin Only)
export async function DELETE(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Message ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteMessage(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
