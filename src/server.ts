import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
import { Server } from "http";

let server: Server;
//* Mongoose configuration
async function main() {
  try {
    //* Connect to MongoDB
    await mongoose.connect(config.databaseURI as string);

    //* Listener
    server = app.listen(config.port, () => {
      console.log(`MONGOOSE server is listening on ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

// Handle unhandledRejection
process.on("unhandledRejection", () => {
  console.error("Unhandled rejection, terminating server...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Handle uncaughtException
process.on("uncaughtException", () => {
  console.error("Uncaught exception, terminating server...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});
