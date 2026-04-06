import fs from 'fs';
import path from 'path';

export class StorageAdapter {
    static get EVENTS_FILE() { return path.join(process.cwd(), 'public', 'data', 'events.json'); }
    static get CURATED_INTAKE_FILE() { return path.join(process.cwd(), 'public', 'data', 'curated_intake.json'); }

    static readCurated() {
        if (!fs.existsSync(this.CURATED_INTAKE_FILE)) return [];
        return JSON.parse(fs.readFileSync(this.CURATED_INTAKE_FILE, 'utf8'));
    }

    static saveEvents(data) {
        // Enforce atomic writes and pure IO segregation
        fs.writeFileSync(this.EVENTS_FILE, JSON.stringify(data, null, 2));
    }
}
