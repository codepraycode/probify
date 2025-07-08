import { syncModules } from "./sync-modules";
import { syncTopics } from "./sync-topics";

async function main() {

    
    try {
        await syncTopics();
    } catch(err) {
        console.error("🔥 Sync failed:", err);
        process.exit(1);
    }

    try {
        await syncModules();
    } catch(err) {
        console.error("🔥 Sync failed:", err);
        process.exit(1);
    }

    process.exit(0);
}

main();