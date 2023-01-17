import { connect } from "mongoose";
import "reflect-metadata";
import { notifyClientsDayBefore } from "./components/notifier.component";
import { config } from "./config";
import { LawBranchModel } from "./models/LawBranch";
import { LawyerModel } from "./models/Lawyer";
import { UserModel } from "./models/User";

import { startScheduler } from "./schedule";
import { startServer } from "./server.api";
import { createClient, createLawyer, generateTimeslots, UserRole } from "./types.index";

async function main() {
    await connect(config.MONGO_CONN_STRING);

    // await generateTimeslots();
    // await notifyClientsDayBefore();
    // await createClient()
    // await createLawyer()

    // const user = await UserModel.findOne({
    //     where: { phone: 79092349569, _type: UserRole.Lawyer },
    // });
    // console.log(user);
    

    await startServer();

    startScheduler();
}

main().catch((e) => console.log(e.message));
