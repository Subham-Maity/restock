import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { IFilter } from "@/types/utility/core/filter/filter.type";

export const DesktopFilter = ({
  handleFilter,
  filters,
}: {
  handleFilter: (e: any, section: any, option: any) => void;
  filters: IFilter[];
}) => {
  return (
    <>
      <form className="hidden xl:block product-card ">
        <h3 className="sr-only">Categories</h3>

        {filters.map((section: any) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b dark:border-gray-200 border-gray-800/25 py-8 dark:text-white px-8"
          >
            {({ open }) => (
              <>
                <h3 className="-my-3 flow-root">
                  {/*Here it is*/}
                  <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-black hover:text-gray-500 dark:hover:bg-[#34384e]  px-2 dark:text-white dark:hover:text-[#8669de] ">
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
                  <div className="space-y-4">
                    {section.options.map((option: any, optionIdx: any) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`filter-${section.id}-${optionIdx}`}
                          name={`${section.id}[]`}
                          defaultValue={option.value}
                          type="checkbox"
                          defaultChecked={option.checked}
                          onChange={(e) => handleFilter(e, section, option)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#8669de] "
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ))}
      </form>
    </>
  );
};
