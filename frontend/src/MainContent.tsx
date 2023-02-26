import {Box, BoxProps, Button, Typography} from "@mui/material";
import {
  Application,
  ApplicationNode,
  ApplicationQuestion,
} from "../../shared-types";
import {SectionRenderer} from "./application/SectionRenderer";
import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import ApplicationContext, {
  QuestionAnswerActionT,
  QuestionAnswerMapT,
} from "./ApplicationContext";
import axios from "axios";

interface Props {
  application: Application;
  style: BoxProps["style"];
  onSubmit: (application: Application) => void;
}

// function reducer(state: any, item: any) {
//   return [...state, item];
// }

function getQuestionsFromNode(node: ApplicationNode): ApplicationQuestion[] {
  if (node.type === "Question" && node.children == null) {
    return [node];
  }
  if (node.children == null) {
    return [];
  }
  let localQuestions: ApplicationQuestion[] = [];
  node.children.forEach((childNode) => {
    localQuestions.concat(getQuestionsFromNode(childNode));
  });
  return localQuestions;
}

//create state here for Application
export const MainContent: React.VFC<Props> = ({application, style}) => {
  const [currentApp, setCurrentApp] = React.useState<Application>(application);
  const rootSections = application?.content.map((section) => (
    <SectionRenderer key={section.id} section={section} depth={0} />
  ));
  const defaultQuestionAnswerMap: QuestionAnswerMapT = useMemo(() => {
    let questionToAnswersMap: {
      [questionId: string]: string | undefined;
    } = {};

    application?.content.forEach((section) => {
      getQuestionsFromNode(section).forEach((question) => {
        questionToAnswersMap[question.id] = question.answer;
      });
    });

    return questionToAnswersMap;
  }, [application]);

  const questionReducer = (
    state: QuestionAnswerMapT,
    action: QuestionAnswerActionT
  ): QuestionAnswerMapT => {
    state[action.questionId] = action.answer;
    return state;
  };

  const [questionsToAnswerMap, questionCallback] = useReducer(
    questionReducer,
    defaultQuestionAnswerMap
  );

  const constructAppStateForPost = useCallback(() => {
    const appLocal = application;
    const setValue = (node: ApplicationNode) => {
      if (node.children) {
        node.children?.forEach((node) => setValue(node));
      }

      if (node.type !== "Question") {
        return;
      }

      node.answer = questionsToAnswerMap[node.id];
    };

    appLocal.content.forEach((section) => {
      setValue(section);
    });

    return appLocal;
  }, [questionsToAnswerMap, application]);

  const handleSubmit = (currentApp: Application) => {
    console.log(currentApp);
    console.log(constructAppStateForPost());
    //TODO: Temp. Redo this
    axios.post("/api/applications/update", {application: currentApp});
  };

  return (
    <ApplicationContext.Provider
      value={{
        currentApp,
        setCurrentApp,
        questionToAnswers: questionsToAnswerMap,
        setQuestionAnswerCallback: questionCallback,
      }}
    >
      <Box style={style}>
        <Typography variant="h1">Quotes To Go</Typography>
        <Typography variant="body1">Quotes You Can Take With You</Typography>
        <Box>{rootSections}</Box>
        <Button
          variant="outlined"
          onClick={() => {
            handleSubmit(currentApp);
          }}
        >
          Submit
        </Button>
      </Box>
    </ApplicationContext.Provider>
  );
};
