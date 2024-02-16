import React from "react";
import Button from "@mui/material/Button";
import { useFormikContext, FormikContextType, FormikValues } from "formik";

interface Props {
  children: React.ReactNode;
  [x: string]: any; // for otherProps
}

const MuiButton: React.FC<Props> = ({ children, ...otherProps }) => {
  const { submitForm }: FormikContextType<FormikValues> = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configButton: any = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
    ...otherProps,
  };

  return <Button {...configButton}>{children}</Button>;
};

export default MuiButton;
