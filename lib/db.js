import sqlite3 from 'better-sqlite3';
import path from 'path';

// Using SQLite resilient singleton pattern
const dbPath = path.resolve(process.cwd(), 'events.db');

let db;

export function getDb() {
    if (!db) {
        db = new sqlite3(dbPath, { verbose: console.log });
        db.pragma('journal_mode = WAL');
    }
    return db;
}

export function initDb() {
    const database = getDb();

    // Events table
    database.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      source_entity TEXT NOT NULL,
      source_url TEXT UNIQUE NOT NULL,
      event_date TEXT,
      location TEXT,
      image_url TEXT,
      age_category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

    // Indexing for faster reads
    database.exec(`
    CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
    CREATE INDEX IF NOT EXISTS idx_age_category ON events(age_category);
  `);

    console.log("Database initialized successfully at", dbPath);
}

export function insertEvent(event) {
    const database = getDb();
    const stmt = database.prepare(`
    INSERT INTO events (id, title, description, source_entity, source_url, event_date, location, image_url, age_category)
    VALUES (@id, @title, @description, @source_entity, @source_url, @event_date, @location, @image_url, @age_category)
    ON CONFLICT(source_url) DO UPDATE SET 
      title = excluded.title,
      description = excluded.description,
      event_date = excluded.event_date
  `);
    return stmt.run(event);
}

export function getAllEvents(ageCategoryFilter = 'all') {
    const database = getDb();
    if (ageCategoryFilter === 'all') {
        return database.prepare('SELECT * FROM events ORDER BY created_at DESC LIMIT 100').all();
    } else {
        // "16mo" or "6yo" or "family"
        return database.prepare("SELECT * FROM events WHERE age_category LIKE '%' || ? || '%' ORDER BY created_at DESC LIMIT 100")
            .all(ageCategoryFilter);
    }
}
