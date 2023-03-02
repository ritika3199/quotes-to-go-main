import type {Application} from "../../shared-types";
import express, {Request, Response} from "express";
import {
  ApplicationCreateArgs,
  ApplicationUpdateArgs,
  ApplicationDataStore,
} from "./application.datastore";
const datastoreObject = require("./models/applicationSchema");

export const applicationRouter = express.Router();

export const datastore = new ApplicationDataStore();

applicationRouter.get("/all", async (_req, res: Response<Application[]>) => {
  try {
    const allApplications = datastore.getAll();
    res.status(200).send(allApplications);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
});

applicationRouter.get(
  "/:id",
  async (req: Request<{id: string}>, res: Response<Application | null>) => {
    try {
      const app = datastore.getById(req.params.id);
      res.status(200).send(app);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

applicationRouter.post(
  "/new",
  async (
    req: Request<any, any, ApplicationCreateArgs>,
    res: Response<Application>
  ) => {
    const newApplication = new datastoreObject(req.body);
    try {
      await newApplication.save();
      const args = req.body;
      //   const newApplication = datastore.create(args);
      console.log(newApplication);
      res.status(200).send(newApplication);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);

applicationRouter.post(
  "/update",
  async (
    req: Request<any, any, ApplicationUpdateArgs>,
    res: Response<Application | null>
  ) => {
    try {
      const args = req.body;
      datastore.update(args);
      const app = await datastore.getById(args.application.id);
      res.status(200).send(app);
    } catch (e: any) {
      res.status(500).send(e.message);
    }
  }
);
