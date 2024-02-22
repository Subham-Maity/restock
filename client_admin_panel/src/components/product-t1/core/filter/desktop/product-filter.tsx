import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { IFilter } from "@/types/utility/core/filter/filter.type";
import { useState } from "react";
import SearchInput from "@/components/product-t1/core/filter/common/search-input";
import OptionsList from "@/components/product-t1/core/filter/common/option-list";
import MoreOptions from "@/components/product-t1/core/filter/common/more-options";

export const DesktopFilter = ({
  handleFilter,
  filters,
}: {
  handleFilter: (e: any, section: any, option: any) => void;
  filters: IFilter[];
}) => {
  const [searchTerms, setSearchTerms] = useState<string[]>(
    new Array(filters.length).fill(""),
  );

  return (
    <>
      <form className="hidden xl:block default-card-2 ">
        <h3 className="sr-only"></h3>

        {filters.map((section, index: number) => {
          const filteredOptions = section.options.filter(
            (option: { label: string }) =>
              option.label
                .toLowerCase()
                .includes(searchTerms[index].toLowerCase()),
          );

          return (
            <Disclosure
              as="div"
              key={section.id}
              className="border-b dark:border-gray-200 border-gray-800/25 py-8 dark:text-white px-8"
              defaultOpen={true}
            >
              {({ open }) => (
                <>
                  <h3 className="-my-3 flow-root">
                    <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-black hover:text-gray-500 dark:hover:bg-stone-700 px-2 rounded-lg dark:text-white dark:hover:text-[#5ccef8] ">
                      <span className="font-medium">{section.name}</span>
                      <span className="ml-6 flex items-center">
                        {open ? (
                          <MinusIcon className="h-5 w-5" aria-hidden="true" />
                        ) : (
                          <PlusIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                    </Disclosure.Button>
                  </h3>
                  <Disclosure.Panel className="pt-6">
                    <SearchInput
                      index={index}
                      searchTerms={searchTerms}
                      setSearchTerms={setSearchTerms}
                      section={section}
                    />
                    <div className="space-y-4">
                      <OptionsList
                        options={filteredOptions.slice(0, 10)}
                        section={section}
                        handleFilter={handleFilter}
                      />
                      {filteredOptions.length > 10 && (
                        <MoreOptions
                          options={filteredOptions.slice(10)}
                          section={section}
                          handleFilter={handleFilter}
                        />
                      )}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          );
        })}
      </form>
    </>
  );
};

export default DesktopFilter;
