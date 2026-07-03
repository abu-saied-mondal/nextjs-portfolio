import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getProjects, saveProject, deleteProject } from "@/lib/db";

// Helper to check authentication
async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === "portfolio-admin-session-token";
}

// GET: Fetch all projects (Public)
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Add new project (Admin Only)
export async function POST(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, desc, tech, image, demoLink, gitLink, color } = body;

    if (!title || !desc) {
      return NextResponse.json(
        { success: false, error: "Title and description are required" },
        { status: 400 }
      );
    }

    const newProject = await saveProject({
      title,
      desc,
      tech: Array.isArray(tech) ? tech : [],
      image: image || "",
      demoLink: demoLink || "",
      gitLink: gitLink || "",
      color: color || "#00f2fe",
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update existing project (Admin Only)
export async function PUT(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, title, desc, tech, image, demoLink, gitLink, color } = body;

    if (!id || !title || !desc) {
      return NextResponse.json(
        { success: false, error: "ID, title, and description are required" },
        { status: 400 }
      );
    }

    const updatedProject = await saveProject({
      id,
      title,
      desc,
      tech: Array.isArray(tech) ? tech : [],
      image: image || "",
      demoLink: demoLink || "",
      gitLink: gitLink || "",
      color: color || "#00f2fe",
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove project (Admin Only)
export async function DELETE(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Project ID is required" },
        { status: 400 }
      );
    }

    const deleted = await deleteProject(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
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
