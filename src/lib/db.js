import fs from "fs/promises";
import path from "path";

// Local file DB setup
const LOCAL_DB_PATH = path.join(process.cwd(), "data", "db.json");

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URL;
const DB_NAME = process.env.MONGODB_DB || "portfolio";

let client = null;
let db = null;

// Helper to get MongoDB connection
async function getMongoClient() {
  if (!MONGODB_URI) return null;
  if (client && db) return { client, db };

  try {
    const { MongoClient } = await import("mongodb");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    return { client, db };
  } catch (error) {
    console.error("Failed to connect to MongoDB, falling back to local file:", error);
    return null;
  }
}

// Helper to read local JSON database
async function readLocalDb() {
  try {
    const data = await fs.readFile(LOCAL_DB_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading local db, returning default structure:", error);
    return { about: {}, skills: [], experience: [], projects: [], messages: [] };
  }
}

// Helper to write local JSON database
async function writeLocalDb(data) {
  try {
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing local db:", error);
    return false;
  }
}

// --- Unified DB Interface ---

export async function getProjects() {
  const mongo = await getMongoClient();
  if (mongo) {
    const coll = mongo.db.collection("projects");
    const cursor = coll.find({});
    const projects = await cursor.toArray();
    // Normalize MongoDB _id to string id
    return projects.map(p => ({ ...p, id: p.id || p._id.toString(), _id: undefined }));
  } else {
    const local = await readLocalDb();
    return local.projects || [];
  }
}

export async function saveProject(project) {
  const mongo = await getMongoClient();
  if (mongo) {
    const { ObjectId } = await import("mongodb");
    const coll = mongo.db.collection("projects");
    const projectId = project.id;
    
    // Clean up project object for MongoDB insertion
    const data = { ...project };
    delete data.id;

    if (projectId) {
      // Update existing project
      let query;
      try {
        query = { _id: new ObjectId(projectId) };
      } catch (e) {
        query = { id: projectId };
      }
      
      await coll.updateOne(query, { $set: data }, { upsert: true });
      return { ...project, id: projectId };
    } else {
      // Create new project
      const result = await coll.insertOne(data);
      return { ...data, id: result.insertedId.toString() };
    }
  } else {
    const local = await readLocalDb();
    if (!local.projects) local.projects = [];

    if (project.id) {
      // Update
      const index = local.projects.findIndex(p => p.id === project.id);
      if (index !== -1) {
        local.projects[index] = { ...project };
      } else {
        local.projects.push(project);
      }
    } else {
      // Create
      const newId = Date.now().toString();
      const newProject = { ...project, id: newId };
      local.projects.push(newProject);
      project.id = newId;
    }
    await writeLocalDb(local);
    return project;
  }
}

export async function deleteProject(id) {
  const mongo = await getMongoClient();
  if (mongo) {
    const { ObjectId } = await import("mongodb");
    const coll = mongo.db.collection("projects");
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { id: id };
    }
    const result = await coll.deleteOne(query);
    return result.deletedCount > 0;
  } else {
    const local = await readLocalDb();
    if (!local.projects) return false;
    const initialLength = local.projects.length;
    local.projects = local.projects.filter(p => p.id !== id);
    await writeLocalDb(local);
    return local.projects.length < initialLength;
  }
}

export async function getContent() {
  const mongo = await getMongoClient();
  if (mongo) {
    const coll = mongo.db.collection("content");
    const content = await coll.findOne({ _id: "site-content" });
    if (content) {
      return {
        about: content.about || {},
        skills: content.skills || [],
        experience: content.experience || []
      };
    }
    // Fallback to seed data in local JSON if MongoDB is empty
    const localFallback = await readLocalDb();
    return {
      about: localFallback.about || {},
      skills: localFallback.skills || [],
      experience: localFallback.experience || []
    };
  } else {
    const local = await readLocalDb();
    return {
      about: local.about || {},
      skills: local.skills || [],
      experience: local.experience || []
    };
  }
}

export async function saveContent(content) {
  const mongo = await getMongoClient();
  if (mongo) {
    const coll = mongo.db.collection("content");
    await coll.updateOne(
      { _id: "site-content" },
      { 
        $set: { 
          about: content.about,
          skills: content.skills,
          experience: content.experience,
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );
    return true;
  } else {
    const local = await readLocalDb();
    local.about = content.about;
    local.skills = content.skills;
    local.experience = content.experience;
    return await writeLocalDb(local);
  }
}

export async function getMessages() {
  const mongo = await getMongoClient();
  if (mongo) {
    const coll = mongo.db.collection("messages");
    const messages = await coll.find({}).sort({ date: -1 }).toArray();
    return messages.map(m => ({ ...m, id: m._id.toString(), _id: undefined }));
  } else {
    const local = await readLocalDb();
    const messages = local.messages || [];
    // Sort by date descending (assuming date string is comparable ISO format)
    return messages.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

export async function addMessage(message) {
  const messageWithDate = {
    ...message,
    date: message.date || new Date().toISOString()
  };

  const mongo = await getMongoClient();
  if (mongo) {
    const coll = mongo.db.collection("messages");
    const result = await coll.insertOne(messageWithDate);
    return { ...messageWithDate, id: result.insertedId.toString() };
  } else {
    const local = await readLocalDb();
    if (!local.messages) local.messages = [];
    const newId = Date.now().toString();
    const newMessage = { ...messageWithDate, id: newId };
    local.messages.push(newMessage);
    await writeLocalDb(local);
    return newMessage;
  }
}

export async function deleteMessage(id) {
  const mongo = await getMongoClient();
  if (mongo) {
    const { ObjectId } = await import("mongodb");
    const coll = mongo.db.collection("messages");
    let query;
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      query = { id: id };
    }
    const result = await coll.deleteOne(query);
    return result.deletedCount > 0;
  } else {
    const local = await readLocalDb();
    if (!local.messages) return false;
    const initialLength = local.messages.length;
    local.messages = local.messages.filter(m => m.id !== id);
    await writeLocalDb(local);
    return local.messages.length < initialLength;
  }
}
