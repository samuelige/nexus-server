import express, { Express } from "express"
import { databaseConnect } from "./server/database";
import ChatAppServer from "./server";
const initializeApp = (): void => {
  const app: Express = express();
  const chatAppServer = new ChatAppServer(app);
  databaseConnect().then(()=>{
    chatAppServer.start();
  })
};

initializeApp();