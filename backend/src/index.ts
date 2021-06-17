import { Server } from "hapi";
import { database, featuresPlugins } from "./plugin";
import fs from "fs/promises";
async function start() {
  // hapi server instance
  const server = new Server({
    port: 7000,
    host: "localhost",
  });

  await server.register(database);
  // register all features of the app
  await server.register(featuresPlugins, { routes: { prefix: "/api" } });
  // start server
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  server.log("info", `Server running at: ${server.info.uri}`);
}
start();
