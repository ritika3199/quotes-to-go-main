import {Box, BoxProps, Typography} from "@mui/material";
import {ApplicationSection} from "../../../shared-types";
import {QuestionRenderer} from "./QuestionRenderer";
import React, {useState, useContext, useEffect} from "react";
import ApplicationContext, {
  QuestionAnswerActionT,
  QuestionAnswerMapT,
} from "../ApplicationContext";
interface Props {
  section: ApplicationSection;
  depth: number;
}

export const SectionRenderer: React.VFC<Props> = (props) => {
  // const applicationContext = useContext(ApplicationContext);
  // const [showSection, setShowSection] = useState(true);
  // useEffect(() => {
  //   if (props.section.conditions != null) {
  //     setShowSection(
  //       props.section.conditions.reduce((prev, curr) => {
  //         console.log(applicationContext.questionToAnswers[curr.subjectId]);
  //         console.log(curr.displayIfEquals.toString());

  //         return (
  //           prev &&
  //           applicationContext.questionToAnswers[curr.subjectId] ===
  //             curr.displayIfEquals.toString()
  //         );
  //       }, true)
  //     );
  //   }
  // }, [
  //   setShowSection,
  //   applicationContext.questionToAnswers,
  //   props.section.conditions,
  // ]);
  // if (props.section.conditions != null && !showSection) {
  //   console.log("returng null for", props.section.id);
  //   return null;
  // }

  return (
    <Box style={{...sectionStyle, marginLeft: `${props.depth * 40}px`}}>
      {!!props.section.title ? (
        <Typography variant={`h${props.depth + 2}` as any}>
          {props.section.title}
        </Typography>
      ) : undefined}
      {props.section.children?.map((child) => {
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
            currentSection={props.section}
            key={child.id}
            question={child}
            depth={props.depth + 1}
          />
        );
      })}
    </Box>
  );
};

const sectionStyle: BoxProps["style"] = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
};
