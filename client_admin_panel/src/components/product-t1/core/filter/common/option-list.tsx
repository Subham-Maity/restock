import Checkbox from "@/components/product-t1/core/filter/common/checkbox";
import FilterSkeleton from "@/loader/skeleton/product-t1/filter-skeleton";

const OptionsList = ({ options, section, handleFilter, status }: any) =>
  status === "loading" ? (
    <FilterSkeleton />
  ) : (
    options.map((option: any, optionIdx: any) => (
      <div key={option.value} className="flex items-center">
        <Checkbox
          option={option}
          section={section}
          handleFilter={handleFilter}
          optionIdx={optionIdx}
        />
      </div>
    ))
  );

export default OptionsList;
