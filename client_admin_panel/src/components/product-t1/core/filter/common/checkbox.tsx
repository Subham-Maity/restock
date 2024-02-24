import React from "react";
import { Checkbox as NextCheckbox } from "@nextui-org/react";

const Checkbox = ({ option, section, handleFilter, optionIdx }: any) => {
  return (
    <NextCheckbox
      id={`filter-${section.id}-${optionIdx}`}
      name={`${section.id}[]`}
      value={option.value}
      checked={option.checked}
      onChange={(e: any) => handleFilter(e, section, option)}
      color="primary"
    >
      {option.label}
    </NextCheckbox>
  );
};

export default Checkbox;
