import React from "react";
import { TextField, MenuItem, TextFieldVariants } from "@mui/material";
import { useField, useFormikContext } from "formik";

interface Options {
  [key: string]: any;
}

interface SelectWrapperProps {
  name: string;
  label: string;
  color: string;
  options: Options;
  style?: React.CSSProperties;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const CustomSelect: React.FC<SelectWrapperProps> = ({
  name,
  options,
  color,
  onChange,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = evt.target;
    setFieldValue(name, value as any);
    if (onChange) {
      onChange(evt); // Forward the onChange event if provided
    }
  };

  const configSelect: any = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined" as TextFieldVariants,
    fullWidth: true,
    onChange: handleChange,
    color: "secondary",
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={options[item]}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default CustomSelect;
