import { connect } from "mongoose";
import "reflect-metadata";
import { notifyClientsDayBefore } from "./components/notifier.component";
import { LawBranchModel } from "./models/LawBranch";
import { LawyerModel } from "./models/Lawyer";

import { startScheduler } from "./schedule";
import { startServer } from "./server.api";
import { generateTimeslots } from "./types.index";

async function main() {
    await connect("mongodb://127.0.0.1:27017/iwow_test_task");

    // await generateTimeslots();
    await notifyClientsDayBefore();

    await startServer();

    startScheduler();
}

main().catch((e) => console.log(e.message));
