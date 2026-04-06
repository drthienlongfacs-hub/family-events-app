import fs from 'fs';
import path from 'path';

export class MethodologyLogger {
    constructor(logFile = 'evolution_log.json') {
        this.logPath = path.join(process.cwd(), 'public', 'data', logFile);
        this.ensureDirectoryExists(this.logPath);
    }

    ensureDirectoryExists(filePath) {
        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true });
        }
    }

    readLogs() {
        try {
            if (fs.existsSync(this.logPath)) {
                const raw = fs.readFileSync(this.logPath, 'utf8');
                return JSON.parse(raw);
            }
        } catch (e) {
            console.warn("Could not read previous logs:", e.message);
        }
        return { runs: 0, exceptions: [], last_audit: null };
    }

    recordAnomaly(providerName, reason, stackContext = '') {
        const logs = this.readLogs();
        const anomaly = {
            timestamp: new Date().toISOString(),
            provider: providerName,
            issue: reason,
            context: stackContext,
            status: "action_required" // signals systematic evolution needed
        };
        logs.exceptions.push(anomaly);
        // Keep last 50 logs to prevent bloat but ensure tracing
        if (logs.exceptions.length > 50) logs.exceptions.shift();

        fs.writeFileSync(this.logPath, JSON.stringify(logs, null, 2));
        console.error(`[Auto-Evolution Engine] Thấy lỗi ở ${providerName}: Đã ghi danh vào Audit Log. Đây là cơ hội cải tiến tự động (Real evidence).`);
    }

    stampAudit(totalProcessed, totalFailed) {
        const logs = this.readLogs();
        logs.runs += 1;
        logs.last_audit = {
            date: new Date().toISOString(),
            processed: totalProcessed,
            failed: totalFailed,
            health: totalFailed === 0 ? "PASSED" : "DEGRADED"
        };
        fs.writeFileSync(this.logPath, JSON.stringify(logs, null, 2));
    }
}
