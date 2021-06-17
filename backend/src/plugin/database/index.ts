import { MongoClient } from "mongodb";
import { IExtendedServer } from "../../interfaces";
const DatabasePlugin = {
  name: "App-Db",
  version: "0.1.0",
  register: async function (server: any) {
    const client: MongoClient = await MongoClient.connect(
      "mongodb://localhost:27017/dev"
    );
    const db = client.db("dev");
    console.log("Connected to Mongodb:Dev");
    server.log(["info"], `Connected to Mongodb:Dev `);
    server.app["db"] = db;
    server.app["mongoClient"] = client;
  },
};

export default DatabasePlugin;
