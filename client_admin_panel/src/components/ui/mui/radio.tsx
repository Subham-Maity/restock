import React from "react";
import { useField } from "formik";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { FormHelperText } from "@mui/material";

interface CustomRadioButtonsGroupProps {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  row?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomRadioButtonsGroup: React.FC<CustomRadioButtonsGroupProps> = ({
  name,
  label,
  options,
  row = false,
  onChange,
}) => {
  const [field, meta] = useField(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event); // handle field onChange
    if (onChange) {
      onChange(event); // Forward the onChange event if provided
    }
  };

  return (
    <FormControl error={!!(meta.touched && meta.error)}>
      <FormLabel color="secondary">{label}</FormLabel>
      <RadioGroup {...field} row={row} onChange={handleChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option.value}
            control={<Radio color="secondary" />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      {meta.touched && meta.error ? (
        <FormHelperText>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default CustomRadioButtonsGroup;
