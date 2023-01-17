import { connect } from "mongoose";
import "reflect-metadata";
import { config } from "./config";

import { startScheduler } from "./schedule";
import { startServer } from "./server.api";

async function main() {
    await connect(config.MONGO_CONN_STRING);

    await startServer();

    startScheduler();
}

main().catch((e) => console.log(e.message));
