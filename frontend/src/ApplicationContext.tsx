import {createContext} from "react";
import type {Application, ApplicationSection} from "../../shared-types";

const newApp: Application = {
  id: "someId",
  carriers: [""],
  content: [],
};

const ApplicationContext = createContext(newApp);
export default ApplicationContext;
