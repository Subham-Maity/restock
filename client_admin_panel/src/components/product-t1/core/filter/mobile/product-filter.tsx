import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { IFilter } from "@/types/utility/core/filter/filter.type";
import SearchInput from "@/components/product-t1/core/filter/common/search-input";
import OptionsList from "@/components/product-t1/core/filter/common/option-list";
import MoreOptions from "@/components/product-t1/core/filter/common/more-options";

export const MobileFilter = ({
  mobileFiltersOpen,
  setMobileFiltersOpen,
  handleFilter,
  filters,
  status,
}: {
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  handleFilter: (e: any, section: any, option: any) => void;
  filters: IFilter[];
  status: any;
}) => {
  const [searchTerms, setSearchTerms] = useState<string[]>(
    new Array(filters.length).fill(""),
  );

  return (
    <>
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto border-2 default-card-2 rounded-lg">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Filters
                  </h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 dark:bg-[#2a2a2b]"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>

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
                        className="border-t border-gray-200 px-4 py-3 dark:dg-[#2f3349] dark:text-white "
                        defaultOpen={true}
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between px-2 py-3 hover:text-gray-500 dark:hover:bg-[#34384e] dark:hover:text-[#8669de]">
                                <span className="font-medium">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
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
                              <div className="space-y-6">
                                <OptionsList
                                  options={filteredOptions.slice(0, 10)}
                                  section={section}
                                  handleFilter={handleFilter}
                                  status={status}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
