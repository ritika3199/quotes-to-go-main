import type {Application, ApplicationSection} from "../../shared-types";
import {v4 as uuid} from "uuid";
import BaseCurationApplication from "./data/curation-application.json";
const datastoreObject = require("./models/applicationSchema");

export interface ApplicationCreateArgs {
  carriers: string[];
}

export interface ApplicationUpdateArgs {
  application: Application;
}

export enum ValidCarriers {
  Chubb = "chubb",
  CNA = "cna",
  TheHartford = "hartford",
}

export class ApplicationDataStore {
  private data: Map<string, Application>;
  constructor() {
    this.data = new Map<string, Application>();
  }

  public create(args: ApplicationCreateArgs): Application {
    const newApp = {
      id: uuid(),
      carriers: args.carriers,
      content: BaseCurationApplication as ApplicationSection[],
    };
    // const object = new datastoreObject();
    // this.data.set(newApp.id, newApp);
    return newApp;
  }

  public update(args: ApplicationUpdateArgs): void {
    this.data.set(args.application.id, args.application);
  }

  public getById(id: string): Application | null {
    return this.data.get(id) ?? null;
  }

  public getAll(): Application[] {
    return [...this.data.values()];
  }
}
