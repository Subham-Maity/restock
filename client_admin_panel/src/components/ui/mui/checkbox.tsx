import React, { ChangeEvent } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import {
  useField,
  useFormikContext,
  FormikContextType,
  FormikValues,
} from "formik";

interface Props {
  name: string;
  label: string;
  legend: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox: React.FC<Props> = ({
  name,
  label,
  legend,
  onChange,
  ...otherProps
}) => {
  const { setFieldValue }: FormikContextType<FormikValues> = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
    if (onChange) {
      onChange(evt); // Forward the onChange event if provided
    }
  };

  const configCheckbox = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl: any = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={label}
        />
      </FormGroup>
    </FormControl>
  );
};

export default CustomCheckbox;
