import { connect } from "mongoose";
import "reflect-metadata";
import { notifyClientsDayBefore } from "./components/notifier.component";
import { config } from "./config";
import { LawBranchModel } from "./models/LawBranch";
import { LawyerModel } from "./models/Lawyer";

import { startScheduler } from "./schedule";
import { startServer } from "./server.api";
import { generateTimeslots } from "./types.index";

async function main() {
    await connect(config.MONGO_CONN_STRING);

    // await generateTimeslots();
    // await notifyClientsDayBefore();

    await startServer();

    startScheduler();
}

main().catch((e) => console.log(e.message));
