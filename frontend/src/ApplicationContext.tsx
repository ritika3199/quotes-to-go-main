import {createContext} from "react";
import type {Application, ApplicationQuestion} from "../../shared-types";

export type QuestionAnswerMapT = {[questionId: string]: string | undefined};
export type QuestionAnswerActionT = {
  questionId: string;
  answer: string;
};

type ApplicationContext = {
  currentApp: Application;
  setCurrentApp: React.Dispatch<React.SetStateAction<Application>>;
  questionToAnswers: {[questionId: string]: string | undefined};
  setQuestionAnswerCallback: React.Dispatch<QuestionAnswerActionT>;
};

const newApp: ApplicationContext = {
  currentApp: {
    id: "someId",
    carriers: [""],
    content: [],
  },
  setCurrentApp: () => null,
  questionToAnswers: {},
  setQuestionAnswerCallback: (value) => null,
};

const ApplicationContext = createContext<ApplicationContext>(newApp);
export default ApplicationContext;
