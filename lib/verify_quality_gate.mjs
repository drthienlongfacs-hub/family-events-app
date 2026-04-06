import fs from 'fs';
import path from 'path';

const EVENTS_FILE = path.join(process.cwd(), 'public', 'data', 'events.json');
const HEALTH_FILE = path.join(process.cwd(), 'public', 'data', 'system_health.json');

console.log('🛡️ [Auto-Governance] Initiating Pre-Flight Quality Gate Check...');

if (!fs.existsSync(EVENTS_FILE)) {
    console.error('❌ [Gate Failed] events.json does not exist. Halting deployment to prevent Zero Scope Creep.');
    process.exit(1);
}

const eventsData = JSON.parse(fs.readFileSync(EVENTS_FILE, 'utf8'));

// If fewer than 2 events were verified, the harvest is dangerously low and we block the deploy to preserve the existing UI State.
if (eventsData.length < 2) {
    console.error(`❌ [Gate Failed] Critical Volume Drop! Only ${eventsData.length} events processed. Halting deployment to protect UI integrity.`);
    process.exit(1);
}

if (fs.existsSync(HEALTH_FILE)) {
    const health = JSON.parse(fs.readFileSync(HEALTH_FILE, 'utf8'));
    if (health.system_status === 'CRITICAL_FAILURE') {
        console.error('❌ [Gate Failed] AutoEvolutionEngine detected a CRITICAL_FAILURE threshold cascade. Halting deployment.');
        process.exit(1);
    }
}

console.log(`✅ [Gate Passed] Verified ${eventsData.length} valid events. Ready for Release.`);
process.exit(0);
