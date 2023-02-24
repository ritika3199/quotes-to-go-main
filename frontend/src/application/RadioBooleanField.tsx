import {ApplicationQuestion} from "../../../shared-types";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const OPTIONS = [
  {
    label: "Yes",
    value: "true",
  },
  {
    label: "No",
    value: "false",
  },
];

interface Props {
  question: ApplicationQuestion;
  onChange: (value: string) => void;
}

export const RadioBooleanField: React.VFC<Props> = ({question, onChange}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel className="question">{question.displayText}</FormLabel>
      <RadioGroup id={question.id} row onChange={handleChange}>
        {OPTIONS.map((option) => (
          <FormControlLabel
            key={option.label}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
        <FormControlLabel
          sx={{visibility: "hidden"}}
          value="null"
          control={<Radio />}
          label="No"
        />
      </RadioGroup>
    </FormControl>
  );
};
