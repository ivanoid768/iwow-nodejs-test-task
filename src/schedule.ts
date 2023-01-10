import { schedule } from "node-cron";

import { config } from "./config";

export function startScheduler() {
    if (config.RUN_CATEGORY_JOBS) {
        schedule(config.RUN_CATEGORY_CRON, async () => {
            // await addCategoryJobs();
        });
    }
}
