import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const password = searchParams.get("password");

    // Guard with admin password check
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please specify ?password=YOUR_ADMIN_PASSWORD" },
        { status: 401 }
      );
    }

    const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
    const dbName = process.env.MONGODB_DB || "portfolio";

    if (!mongoUri) {
      return NextResponse.json(
        { success: false, error: "MongoDB connection string (MONGODB_URI or MONGO_URL) is not configured on the Vercel server." },
        { status: 500 }
      );
    }

    // 1. Read the local db.json file
    const dbJsonPath = path.join(process.cwd(), "data", "db.json");
    const fileContent = await fs.readFile(dbJsonPath, "utf8");
    const localData = JSON.parse(fileContent);

    // 2. Connect to MongoDB Atlas
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db(dbName);

    // 3. Seed Projects
    let projectsSeeded = 0;
    if (localData.projects && localData.projects.length > 0) {
      const projectsCollection = db.collection("projects");
      
      // Clear existing projects to prevent duplicates
      await projectsCollection.deleteMany({});
      
      // Clean up string IDs for MongoDB insertion
      const cleanProjects = localData.projects.map((proj) => {
        const p = { ...proj };
        delete p.id;
        return p;
      });

      const result = await projectsCollection.insertMany(cleanProjects);
      projectsSeeded = result.insertedCount;
    }

    // 4. Seed Content (About statistics, Skills categories, Experience steps)
    const contentCollection = db.collection("content");
    await contentCollection.deleteMany({});
    await contentCollection.updateOne(
      { _id: "site-content" },
      {
        $set: {
          about: localData.about || {},
          skills: localData.skills || [],
          experience: localData.experience || [],
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    await client.close();

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully from local backup!",
      projectsSeeded,
      contentSeeded: true,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
