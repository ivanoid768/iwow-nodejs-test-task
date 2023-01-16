import { schedule } from "node-cron";
import {
    notifyClients2HoursBefore,
    notifyClientsDayBefore,
} from "./components/notifier.component";

import { config } from "./config";

export function startScheduler() {
    schedule(config.RUN_CLIENT_DAY_BEFORE_NOTIFIER, async () => {
        await notifyClientsDayBefore();
    });

    schedule(config.RUN_CLIENT_2HOURS_BEFORE_NOTIFIER, async () => {
        await notifyClients2HoursBefore();
    });
}
