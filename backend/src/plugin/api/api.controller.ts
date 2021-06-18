import Boom from "boom";
import { IExtendedRequest, readResposne } from "../../interfaces";
import { Collection } from "mongodb";
import { Collections } from "../../collections";
import { Phrase } from "../../models/file.model";
import fs from "fs/promises";
import { ResponseObject } from "hapi";
export default class ApiController {
  constructor() {}

  // function to write phrase into Mongo
  public async writePhraseToMongo(
    request: IExtendedRequest,
    h: ResponseObject
  ) {
    try {
      // grab db from app namespace

      const db = request.server.app.db;
      const collection: Collection = db.collection(Collections.Phrase);
      const payload = request.payload as any;
      const id = payload.id;
      const phrase = payload.phrase;

      // if id or phrase is not present
      if (!id || !phrase) {
        return h.code(400);
      }

      // create phrase
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

  // function to delete phrase from mongo
  public async deletePhareFromMongo(
    request: IExtendedRequest,
    h: ResponseObject
  ) {
    try {
      const db = request.server.app.db;
      const id = request.params.id as any;
      const collection: Collection = db.collection(Collections.Phrase);
      // checking if phrase with id exists or not
      const phrase = await collection.findOne({ id: Number(id) });
      if (!phrase) return h.code(400);

      // if exist delete it
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

  // function to load file data to mongo
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

      // performing bulk write
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

  // function to get phrases directly from file
  public async getPhraseFromFile(request: IExtendedRequest) {
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

  // function to write phrase in file
  public async writePhraseInFile(request: IExtendedRequest) {
    try {
      // read all phrases
      let data = await fs.readFile(__dirname + "/file.txt");
      let sData = data.toString().split("\n");

      // computing write line number
      let lineNumber = sData.length;
      const payload = request.payload as any;
      const phrase = payload.phrase;

      // writing phrase in file
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
  public async deleteFromFile(request: IExtendedRequest) {
    try {
      const payload = request.payload as any;
      const id = request.params.id as any;

      // rading from file
      let data = await fs.readFile(__dirname + "/file.txt");
      let sData = data.toString().split("\n");

      // checking if delete line number is valid or not
      if (id > sData.length - 1) {
        return {
          message: "Delete line Not Possible",
          data: { success: false },
        };
      }

      // removing line number
      sData.splice(id - 1, 1);
      console.log("data is ", sData);
      let writeData = "";

      // aggregrating all phrases
      sData.map((data) => {
        writeData += data + "\n";
      });

      // writing content in file
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
