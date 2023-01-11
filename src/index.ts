import "reflect-metadata";
import { connect } from "mongoose";
import { LawBranchModel } from "./models/LawBranch";

import { startScheduler } from "./schedule";

async function main() {
    await connect("mongodb://127.0.0.1:27017/iwow_test_task");

    const lawBranch = await LawBranchModel.create({
        name: "Административное право",
    });

    console.log(lawBranch.name);

    startScheduler();
}

main().catch((e) => console.log(e.message));
