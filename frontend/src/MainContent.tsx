import {Box, BoxProps, Button, Typography} from "@mui/material";
import {Application} from "../../shared-types";
import {SectionRenderer} from "./application/SectionRenderer";
import React from "react";

interface Props {
  application: Application;
  style: BoxProps["style"];
  onSubmit: (application: Application) => void;
}

//create state here for Application
export const MainContent: React.VFC<Props> = ({
  application,
  style,
  onSubmit,
}) => {
  console.log(application);
  const [currentApp, something] = React.useState<Application>(application);

  const rootSections = application?.content.map((section) => (
    <SectionRenderer key={section.id} section={section} depth={0} />
  ));

  return (
    <Box style={style}>
      <Typography variant="h1">Quotes To Go</Typography>
      <Typography variant="body1">Quotes You Can Take With You</Typography>
      <Box>{rootSections}</Box>
      <Button
        variant="outlined"
        onClick={() => {
          onSubmit(currentApp);
        }}
      >
        Submit
      </Button>
    </Box>
  );
};
