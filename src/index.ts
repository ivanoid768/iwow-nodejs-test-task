import { connect } from "mongoose";
import "reflect-metadata";
import { LawBranchModel } from "./models/LawBranch";
import { LawyerModel } from "./models/Lawyer";

import { startScheduler } from "./schedule";
import { startServer } from "./server.api";

async function main() {
    await connect("mongodb://127.0.0.1:27017/iwow_test_task");

    await startServer();

    // const branches = await LawBranchModel.find()

    // const lawyer = await LawyerModel.create({
    //     name: 'Lawyer_1',
    //     lastname: 'Lawyer_1.lastname',
    //     patronymic: 'Lawyer_1.patronymic',
    //     phone: 7775553322,
    //     password: 'passwordQ3',
    //     lawBranches: [
    //         branches[0],
    //         branches[1]
    //     ]
    // })

    // console.log(lawyer.name);

    startScheduler();
}

main().catch((e) => console.log(e.message));
