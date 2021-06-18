import Boom from "boom";
import { IExtendedRequest, readResposne } from "../../interfaces";
import { Collection } from "mongodb";
import { Collections } from "../../collections";
import { Phrase } from "../../models/file.model";
import fs from "fs/promises";
export default class ApiController {
  constructor() {}

  public async writePhraseToMongo(request: IExtendedRequest) {
    try {
      // grab db from app namespace

      console.log("in write to mongo", request.payload);
      const db = request.server.app.db;
      const collection: Collection = db.collection(Collections.Phrase);
      const payload = request.payload as any;
      const id = payload.id;
      const phrase = payload.phrase;
      console.log("id phrase is ", id, phrase);
      const newPhrase: Phrase = { id, phrase };
      const result = await collection.insertOne(newPhrase);

      return {
        message: `Successfully added a phrase`,
        data: newPhrase,
      };
    } catch (e) {
      return Boom.boomify(e);
    }
  }

  public async deletePhareFromMongo(request: IExtendedRequest) {
    try {
      const db = request.server.app.db;
      const id = request.params.id as any;
      console.log("id is", id);
      const collection: Collection = db.collection(Collections.Phrase);
      const result = await collection.deleteOne({
        id: Number(id),
      });

      return {
        message: "delete Phrase Success",
        data: result,
      };
    } catch (err) {
      return Boom.boomify(err);
    }
  }

  public async loadPhareToMongo(request: IExtendedRequest) {
    try {
      let data = await fs.readFile(__dirname + "/file.txt");
      let sData = data.toString().split("\n");
      let res: Array<readResposne> = [];
      sData.map((data, index) => {
        let obj = {
          id: index + 1,
          phrase: data,
        };
        res.push(obj);
      });

      const db = request.server.app.db;
      const collection: Collection = db.collection(Collections.Phrase);
      const result = await collection.insertMany(res);

      return {
        message: "BulkInsert Phhrase Success",
        data: res,
      };
    } catch (err) {
      return Boom.boomify(err);
    }
  }

  public async getPhraseFromMongo(request: IExtendedRequest) {
    try {
      const db = request.server.app.db;
      const collection: Collection = db.collection(Collections.Phrase);
      const result = await collection.find({}).toArray();

      console.log("res", result);

      return {
        message: "get  Phrase Success",
        data: result,
      };
    } catch (err) {
      console.log("Error in getting phrase from mongo", err);
      return Boom.boomify(err);
    }
  }
  public async getPhrase(request: IExtendedRequest) {
    try {
      let data = await fs.readFile(__dirname + "/file.txt");
      let sData = data.toString().split("\n");
      let res: Array<readResposne> = [];
      sData.map((data, index) => {
        let obj = {
          id: index + 1,
          phrase: data,
        };
        res.push(obj);
      });
      return {
        message: "Read file  success",
        data: res,
      };
    } catch (err) {
      console.log("error in file read", err);
      return Boom.boomify(err);
    }
  }

  public async write(request: IExtendedRequest) {
    try {
      let data = await fs.readFile(__dirname + "/file.txt");
      let sData = data.toString().split("\n");
      let lineNumber = sData.length;
      const payload = request.payload as any;
      const phrase = payload.phrase;
      await fs.appendFile(`${__dirname}/file.txt`, `${phrase} \n`);
      let res = { id: lineNumber + 1, phrase };
      return {
        message: "write phrase  success",
        data: res,
      };
    } catch (err) {
      console.log("error in write/read read", err);
      return Boom.boomify(err);
    }
  }
  public async delete(request: IExtendedRequest) {
    try {
      const payload = request.payload as any;
      const id = request.params.id as any;
      let data = await fs.readFile(__dirname + "/file.txt");
      let sData = data.toString().split("\n");
      if (id > sData.length - 1) {
        return {
          message: "Delete line Not Possible",
          data: { success: false },
        };
      }
      sData.splice(id - 1, 1);
      console.log("data is ", sData);
      let writeData = "";
      sData.map((data) => {
        writeData += data + "\n";
      });

      await fs.writeFile(__dirname + "/file.txt", writeData);
      return {
        message: "Delete phrase  success",
        data: { success: true },
      };
    } catch (err) {
      return Boom.boomify(err);
    }
  }
}
