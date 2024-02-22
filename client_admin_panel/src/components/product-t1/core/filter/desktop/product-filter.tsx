import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { IFilter } from "@/types/utility/core/filter/filter.type";

export const DesktopFilter = ({
  handleFilter,
  filters,
}: {
  handleFilter: (e: any, section: any, option: any) => void;
  filters: IFilter[];
  // TODO: The interface will initially display a maximum of 10 items.If there are more than 10 items, a ‘+231 more’ (or the actual number of additional items) indicator will be shown.Upon clicking this indicator,
  // TODO: a modal window will open. This modal will contain cards representing each item, and it will have a fixed width and height that adapts to different screen sizes. At the top of the modal, there will be a search bar,
  // TODO: accompanied by an alphabetical index (A, B, C, D, E, F, G, H… Z). Users can search for a specific brand or category by typing into the search bar. The search results will be displayed in the list below, categorized
  // TODO: alphabetically. Additionally, users can quickly navigate to brands or categories starting with a specific letter by clicking on that letter in the alphabetical index at the top.
  // TODO: For example, clicking on ‘B’ will display all brands and categories starting with ‘B’.The modal will also include a close button for users to easily exit the modal view.
}) => {
  return (
    <>
      <form className="hidden xl:block default-card-2 ">
        <h3 className="sr-only"></h3>

        {filters.map((section: any) => (
          <Disclosure
            as="div"
            key={section.id}
            className="border-b dark:border-gray-200 border-gray-800/25 py-8 dark:text-white px-8"
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
                          className="h-4 w-4 rounded border-gray-300 text-[#2c515d]"
                        />
                        <label
                          htmlFor={`filter-${section.id}-${optionIdx}`}
                          className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] "
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
