const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

// 1. Helper to parse .env.local file manually
function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Error: .env.local file not found at " + envPath);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, "utf8");
  const env = {};
  
  envContent.split(/\r?\n/).forEach((line) => {
    // Skip comments and empty lines
    if (line.trim().startsWith("#") || !line.includes("=")) return;
    
    const delimiterIndex = line.indexOf("=");
    const key = line.slice(0, delimiterIndex).trim();
    let value = line.slice(delimiterIndex + 1).trim();
    
    // Remove wrapping quotes if present
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    
    env[key] = value;
  });
  
  return env;
}

async function main() {
  const env = loadEnv();
  const mongoUri = env.MONGODB_URI || env.MONGO_URL;
  const dbName = env.MONGODB_DB || "portfolio";

  if (!mongoUri) {
    console.error("Error: MONGODB_URI or MONGO_URL not defined in .env.local");
    process.exit(1);
  }

  // 2. Read local db.json
  const dbJsonPath = path.join(__dirname, "..", "data", "db.json");
  if (!fs.existsSync(dbJsonPath)) {
    console.error("Error: data/db.json file not found at " + dbJsonPath);
    process.exit(1);
  }

  const localData = JSON.parse(fs.readFileSync(dbJsonPath, "utf8"));
  console.log(`Successfully read local data. Found:`);
  console.log(`- Projects: ${localData.projects?.length || 0}`);
  console.log(`- Skills Categories: ${localData.skills?.length || 0}`);
  console.log(`- Experience Steps: ${localData.experience?.length || 0}`);

  // 3. Connect to MongoDB Atlas
  console.log("\nConnecting to MongoDB Atlas...");
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    console.log("Connected successfully!");
    const db = client.db(dbName);

    // 4. Seed Projects
    if (localData.projects && localData.projects.length > 0) {
      console.log("\nSeeding projects collection...");
      const projectsCollection = db.collection("projects");
      
      // Clean collection first
      await projectsCollection.deleteMany({});
      
      // Remove local string IDs so MongoDB generates its own clean ObjectIds
      const cleanProjects = localData.projects.map((proj) => {
        const p = { ...proj };
        delete p.id; // Let Mongo generate _id
        return p;
      });

      const result = await projectsCollection.insertMany(cleanProjects);
      console.log(`Inserted ${result.insertedCount} projects into MongoDB.`);
    }

    // 5. Seed Content (About, Skills, Experience)
    console.log("\nSeeding content collection...");
    const contentCollection = db.collection("content");
    
    // Clean content collection first
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
    console.log("Inserted main site content (About, Skills, Experience) into MongoDB.");

    console.log("\n🎉 Database Seeding completed successfully!");
  } catch (error) {
    console.error("\n❌ Seeding failed with error:", error);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

main();
