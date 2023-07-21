import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config/config";
let server: Server;

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception ", err);
    process.exit(1);
});

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log(`🛢  Database is connected successfully!`);

        server = app.listen(config.port, () => {
            console.log(`Application  listening on port ${config.port}`);
        });
    } catch (err) {
        console.log("Failed to connect database", err);
    }
    process.on("unhandledRejection", (err) => {
        if (server) {
            server.close(() => {
                console.log(err);
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });
}

main();
