import {BoxProps, Box} from "@mui/material";
import {ApplicationQuestion} from "../../../shared-types";
import {RadioBooleanField} from "./RadioBooleanField";
import {SectionRenderer} from "./SectionRenderer";
import {SelectField} from "./SelectField";
import {TextField} from "./TextField";
import React, {useContext} from "react";
import ApplicationContext from "../ApplicationContext";
import {ApplicationSection} from "../../../shared-types";

interface Props {
  currentSection: ApplicationSection;
  key?: string;
  question: ApplicationQuestion;
  depth: number;
}

export const QuestionRenderer: React.VFC<Props> = (props) => {
  const {question} = props;
  const {setQuestionAnswerCallback, questionToAnswers} =
    useContext(ApplicationContext);
  // if (
  //   props.question.conditions?.length > 0
  // ) {
  //   props.question.conditions?.forEach((condition) => {

  //   })
  // }

  const handleChange = (value: string) => {
    setQuestionAnswerCallback({
      questionId: question.id,
      answer: value,
    });
    console.log(questionToAnswers);
  };

  const FieldComponent =
    question.componentType === "text" ? (
      <TextField question={question} onChange={handleChange} />
    ) : question.componentType === "radioBoolean" ? (
      <RadioBooleanField question={question} onChange={handleChange} />
    ) : (
      <SelectField question={question} onChange={handleChange} />
    );
  return (
    <Box style={{...questionProps, marginLeft: `${props.depth * 40}px`}}>
      {FieldComponent}
      {props.question.children?.map((child) => {
        if (child.type === "Section") {
          return (
            <SectionRenderer
              key={child.id}
              section={child}
              depth={props.depth + 1}
            />
          );
        }
        return (
          <QuestionRenderer
            key={child.id}
            currentSection={props.currentSection}
            question={child}
            depth={props.depth + 1}
          />
        );
      })}
    </Box>
  );
};

const questionProps: BoxProps["style"] = {
  width: "400px",
  marginTop: "20px",
};
