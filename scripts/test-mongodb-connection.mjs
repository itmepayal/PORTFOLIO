/**
 * Test MongoDB Atlas connection using MONGODB_URI from .env.local
 * Run: node --env-file=.env.local scripts/test-mongodb-connection.mjs
 */
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI?.trim();

if (!uri) {
  console.error("MONGODB_URI is not set.");
  console.error("Add it to .env.local or GoDaddy environment variables.");
  console.error("\nMongoDB Atlas setup:");
  console.error("  1. https://www.mongodb.com/atlas → Create free cluster");
  console.error("  2. Database Access → Add user + password");
  console.error("  3. Network Access → Add IP 0.0.0.0/0");
  console.error("  4. Database → Connect → Drivers → copy connection string");
  process.exit(1);
}

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  console.log("MongoDB connection successful.");
  await mongoose.disconnect();
  process.exit(0);
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}
