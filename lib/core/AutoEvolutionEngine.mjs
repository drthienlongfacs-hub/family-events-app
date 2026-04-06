import fs from 'fs';
import path from 'path';

const LOG_FILE = path.join(process.cwd(), 'public', 'data', 'evolution_log.json');
const HEALTH_FILE = path.join(process.cwd(), 'public', 'data', 'system_health.json');

/**
 * AutoEvolutionEngine
 * This engine embodies the principle of "Real Evidence Based Evolution".
 * It analyzes the historical failures of data providers and automatically
 * quarantines sources that yield too much noise (failed Checklists) and not enough valid data.
 */
export class AutoEvolutionEngine {
    static getActiveProviders(allProviders) {
        console.log("🧠 [Auto-Evolution] Analyzing historical anomalies to dynamically tune Data Engine.");
        let exceptions = [];
        try {
            if (fs.existsSync(LOG_FILE)) {
                const data = JSON.parse(fs.readFileSync(LOG_FILE, 'utf8'));
                exceptions = data.exceptions || [];
            }
        } catch (e) {
            console.error("Warning: Could not read evolution_log.json", e.message);
        }

        // Only look at the latest 100 log entries for current trends
        const recentLogs = exceptions.slice(-100);

        // Count anomalies by source
        const anomalyCounts = {};
        recentLogs.forEach(entry => {
            const source = entry.provider || 'Unknown';
            anomalyCounts[source] = (anomalyCounts[source] || 0) + 1;
        });

        // Evolution Policy: If a source generates more than 15 anomalies in the recent window,
        // it is classified as "High Noise" and automatically quarantined.
        const NOISE_THRESHOLD = 15;
        const activeProviders = [];
        const quarantinedProviders = [];
        const healthReport = {
            last_analysis: new Date().toISOString(),
            anomaly_map: anomalyCounts,
            quarantined: [],
            active_count: 0
        };

        allProviders.forEach(provider => {
            // Map the generic logger source string back to provider keys if possible.
            // Our logger currently uses "Google News Crawler" for all RSS, but we can tune it.
            // For now, let's establish the structural integrity of the circuit breaker.
            const noiseLevel = anomalyCounts[provider.key] || 0;
            if (noiseLevel > NOISE_THRESHOLD) {
                console.log(`⚠️ [Auto-Evolution] Provider ${provider.name} quarantined! Evidence: ${noiseLevel} failures in recent window.`);
                quarantinedProviders.push({ provider: provider.name, failures: noiseLevel });
            } else {
                activeProviders.push(provider);
            }
        });

        healthReport.quarantined = quarantinedProviders;
        healthReport.active_count = activeProviders.length;

        // Persist the health snapshot as evidence
        fs.writeFileSync(HEALTH_FILE, JSON.stringify(healthReport, null, 2));

        return activeProviders;
    }
}
