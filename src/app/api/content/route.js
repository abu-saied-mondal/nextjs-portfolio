import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getContent, saveContent } from "@/lib/db";

// Helper to check authentication
async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === "portfolio-admin-session-token";
}

// GET: Fetch all content (Public)
export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json({ success: true, ...content });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update site content (Admin Only)
export async function PUT(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { about, skills, experience } = body;

    if (!about || !skills || !experience) {
      return NextResponse.json(
        { success: false, error: "Missing content fields (about, skills, or experience)" },
        { status: 400 }
      );
    }

    const updated = await saveContent({ about, skills, experience });
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Failed to update content" },
        { status: 500 }
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
