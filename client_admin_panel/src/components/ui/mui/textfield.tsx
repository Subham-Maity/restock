// CustomTextField.tsx
import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type CustomTextFieldProps = {
  name: string;
} & TextFieldProps;

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      {...props}
      error={Boolean(meta.touched && meta.error)}
      helperText={meta.touched ? meta.error : ""}
    />
  );
};

export default CustomTextField;
