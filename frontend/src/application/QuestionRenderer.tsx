import {BoxProps, Box} from "@mui/material";
import {ApplicationQuestion} from "../../../shared-types";
import {RadioBooleanField} from "./RadioBooleanField";
import {SectionRenderer} from "./SectionRenderer";
import {SelectField} from "./SelectField";
import {TextField} from "./TextField";
import React, {useContext} from "react";
import ApplicationContext from "../ApplicationContext";
import {ApplicationSection} from "../../../shared-types";
import {ContentCopy} from "@mui/icons-material";

interface Props {
  currentSection: ApplicationSection;
  key?: string;
  question: ApplicationQuestion;
  depth: number;
}

export const QuestionRenderer: React.VFC<Props> = (props) => {
  const {question} = props;
  const application = useContext(ApplicationContext);

  const handleChange = (value: string) => {
    const sectionIndex = application?.content.findIndex((section) => {
      return section.id === props.currentSection.id;
    });

    const questionIndex = application.content[sectionIndex].children?.findIndex(
      (nodes) => {
        return nodes.type === "Question" && nodes.id === props.question.id;
      }
    );
    application.content[sectionIndex].children?.map((node) => {
      if (
        node.type === "Question" &&
        node.id === props.question.id &&
        questionIndex
      ) {
        const content = application.content[sectionIndex];
        if (content.children != null) {
          content.children[questionIndex].userAnswer = value;
        }
      }
    });
  };

  const FieldComponent =
    question.componentType === "text" ? (
      <TextField question={question} />
    ) : question.componentType === "radioBoolean" ? (
      <RadioBooleanField question={question} onChange={handleChange} />
    ) : (
      <SelectField question={question} />
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
