import {createContext} from "react";
import type {Application, ApplicationQuestion} from "../../shared-types";

export type QuestionAnswerMapT = {[questionId: string]: string | undefined};
export type QuestionAnswerActionT = {
  questionId: string;
  answer: string;
};

type ApplicationContext = {
  questionToAnswers: {[questionId: string]: string | undefined};
  setQuestionAnswerCallback: React.Dispatch<QuestionAnswerActionT>;
};

const newApp: ApplicationContext = {
  questionToAnswers: {},
  setQuestionAnswerCallback: (value) => null,
};

const ApplicationContext = createContext<ApplicationContext>(newApp);
export default ApplicationContext;
