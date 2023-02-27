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

function getQuestionsFromNode(node: ApplicationNode): ApplicationQuestion[] {
  if (node.type === "Question" && node.children == null) {
    //base case, what we really want, leaf nodes of type Question
    return [node];
  }
  let localQuestions: ApplicationQuestion[] = [];
  if (node.type === "Question") {
    //any question nodes that aren't leafs
    localQuestions.push(node);
  }

  if (node.children == null) {
    //not a question but has nothing under
    return [];
  }

  //Node - (Section OR Question) with children
  node.children.forEach((childNode) => {
    localQuestions = [...localQuestions, ...getQuestionsFromNode(childNode)];
  });
  return localQuestions;
}

export const MainContent: React.VFC<Props> = ({application, style}) => {
  const rootSections = application?.content.map((section) => (
    <SectionRenderer key={section.id} section={section} depth={0} />
  ));
  const defaultQuestionAnswerMap: QuestionAnswerMapT = useMemo(() => {
    let questionToAnswersMap: {
      [questionId: string]: string | undefined;
    } = {};

    application?.content.forEach((section) => {
      //all nodes of type Question
      const nodes = getQuestionsFromNode(section);
      nodes.forEach((question) => {
        console.log(question);
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
    const appState = constructAppStateForPost();
    axios.post("/api/applications/update", {application: appState});
  };

  return (
    <ApplicationContext.Provider
      value={{
        questionToAnswers: questionsToAnswerMap,
        setQuestionAnswerCallback: questionCallback,
      }}
    >
      <Box style={style}>
        <Typography variant="h1">Quotes To Go</Typography>
        <Typography variant="body1">Quotes You Can Take With You</Typography>
        <Box>{rootSections}</Box>
        {application != null && (
          <Button
            variant="outlined"
            onClick={() => {
              handleSubmit(application);
            }}
          >
            Submit
          </Button>
        )}
      </Box>
    </ApplicationContext.Provider>
  );
};
