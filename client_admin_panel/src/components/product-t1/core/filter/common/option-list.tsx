const OptionsList = ({ options, section, handleFilter }: any) =>
  options.map((option: any, optionIdx: any) => (
    <div key={option.value} className="flex items-center">
      <input
        id={`filter-${section.id}-${optionIdx}`}
        name={`${section.id}[]`}
        defaultValue={option.value}
        type="checkbox"
        defaultChecked={option.checked}
        onChange={(e) => handleFilter(e, section, option)}
        className="h-4 w-4 rounded border-gray-300 text-[#2c515d]"
      />
      <label
        htmlFor={`filter-${section.id}-${optionIdx}`}
        className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] "
      >
        {option.label}
      </label>
    </div>
  ));

export default OptionsList;
