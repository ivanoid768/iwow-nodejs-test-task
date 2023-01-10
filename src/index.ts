import "reflect-metadata";

import { startScheduler } from "./schedule";

async function main() {
    

    startScheduler();
}

main().catch(e => console.log(e.message))