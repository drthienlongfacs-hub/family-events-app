import { initDb } from '../lib/db.js';

console.log("Initializing database...");
try {
    initDb();
    console.log("Database schema created successfully.");
} catch (error) {
    console.error("Error initializing database:", error);
}
