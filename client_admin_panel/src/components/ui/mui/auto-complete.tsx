import React, { useState, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

interface CustomAutoCompleteProps {
  name: string;
  label: string;
  options: any[];
  onChange?: (event: React.ChangeEvent<{}>, value: any) => void;
}

const CustomAutoComplete: React.FC<CustomAutoCompleteProps> = ({
  name,
  label,
  options,
  onChange,
}) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  const [open, setOpen] = useState(false);
  const [localOptions, setLocalOptions] = useState<readonly any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    setFieldValue(name, value);
    setFieldTouched(name, true); // Ensure the field is touched when a value is selected
    if (onChange) {
      const syntheticEvent = {
        target: {
          name,
          value,
        },
      };
      onChange(syntheticEvent as any, value);
    }
  };

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (active) {
        setLocalOptions(options);
        setLoading(false);
      }
    };

    if (open && localOptions.length === 0) {
      fetchData();
    }

    return () => {
      active = false;
    };
  }, [open, localOptions.length, options]);

  useEffect(() => {
    if (!open) {
      setLocalOptions([]);
    }
  }, [open]);

  useEffect(() => {
    // console.log("Selected value:", field.value);
  }, [field.value]);

  const configAutocomplete: any = {
    ...field,
    options: localOptions,
    getOptionLabel: (option: any) => option,
    isOptionEqualToValue: (option: any, value: any) => option === value,
    onChange: handleChange,
    open,
    onOpen: () => setOpen(true),
    onClose: () => setOpen(false),
    loading,
    renderInput: (params: any) => (
      <TextField
        {...params}
        label={label}
        variant="outlined"
        color="secondary"
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched ? meta.error : ""}
        style={{ width: "35ch" }}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color="inherit" size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        }}
      />
    ),
  };

  return <Autocomplete {...configAutocomplete} />;
};

export default CustomAutoComplete;
