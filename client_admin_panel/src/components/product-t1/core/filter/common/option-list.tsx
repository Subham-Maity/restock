import Checkbox from "@/components/product-t1/core/filter/common/checkbox";

const OptionsList = ({ options, section, handleFilter }: any) =>
  options.map((option: any, optionIdx: any) => (
    <div key={option.value} className="flex items-center">
      <Checkbox
        option={option}
        section={section}
        handleFilter={handleFilter}
        optionIdx={optionIdx}
      />
      {/*<label*/}
      {/*  htmlFor={`filter-${section.id}-${optionIdx}`}*/}
      {/*  className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] "*/}
      {/*>*/}
      {/*  {option.label}*/}
      {/*</label>*/}
    </div>
  ));

export default OptionsList;
