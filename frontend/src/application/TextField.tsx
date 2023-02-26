import {ApplicationQuestion} from "../../../shared-types";
import {TextField as MuiTextField, TextFieldProps} from "@mui/material";

interface Props {
  question: ApplicationQuestion;
  onChange: (value: string) => void;
}

export const TextField: React.VFC<Props> = ({question, onChange}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange((event.target as HTMLInputElement).value);
  };
  return (
    <MuiTextField
      name={question.id}
      label={question.displayText}
      variant="standard"
      style={textStyles}
      defaultValue={question.answer}
      onChange={handleChange}
    />
  );
};

const textStyles: TextFieldProps["style"] = {
  width: "100%",
};
