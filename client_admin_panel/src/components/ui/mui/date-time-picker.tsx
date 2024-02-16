import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField, FieldHookConfig } from "formik";

type MyFieldHookConfig = FieldHookConfig<string> & { name: string };

type DateTimePickerProps = MyFieldHookConfig &
  TextFieldProps & {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };

const CustomDateTimePicker: React.FC<DateTimePickerProps> = ({
  name,
  onChange,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event); // handle field onChange
    if (onChange) {
      onChange(event); // Forward the onChange event if provided
    }
  };

  const configDateTimePicker: any = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default CustomDateTimePicker;
