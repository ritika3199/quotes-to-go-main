import {ApplicationQuestion} from "../../../shared-types";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import React, {ReactNode} from "react";
interface Props {
  question: ApplicationQuestion;
  onChange: (value: string) => void;
}

export const SelectField: React.VFC<Props> = ({question, onChange}) => {
  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    onChange(event.target.value);
  };
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel>{question.displayText}</InputLabel>
      <MuiSelect
        style={selectStyles}
        onChange={handleChange}
        defaultValue={question.answer}
      >
        {question.options?.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

const selectStyles: SelectProps["style"] = {
  width: "100%",
};
