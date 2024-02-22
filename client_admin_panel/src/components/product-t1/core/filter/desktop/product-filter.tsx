import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { IFilter } from "@/types/utility/core/filter/filter.type";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/shadcn/command";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

const chooseSideLeft = SHEET_SIDES[3]; //0 1 2 3

export const DesktopFilter = ({
  handleFilter,
  filters,
}: {
  handleFilter: (e: any, section: any, option: any) => void;
  filters: IFilter[];
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
                    {section.options
                      .slice(0, 10)
                      .map((option: any, optionIdx: any) => (
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
                    {section.options.length > 10 && (
                      <div>
                        <Sheet>
                          <SheetTrigger className="text-md ml-2 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] ">
                            +{section.options.length - 10} more
                          </SheetTrigger>
                          <SheetContent
                            side={chooseSideLeft}
                            className="w-full"
                          >
                            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
                              <Command>
                                <CommandInput
                                  placeholder="Search for an option"
                                  className="w-full dark:hover:bg-stone-800 shadow-2xl rounded-md h-9 mt-2 mb-2"
                                />

                                <CommandEmpty className="default-card-2">
                                  No options found
                                </CommandEmpty>
                                <CommandGroup className="default-card-2">
                                  {section.options
                                    .slice(10)
                                    .map((option: any, optionIdx: any) => (
                                      <CommandItem
                                        value={option.label}
                                        key={option.value}
                                        onSelect={() => {
                                          handleFilter(null, section, option);
                                        }}
                                      >
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-${section.id}-${
                                              optionIdx + 10
                                            }`}
                                            name={`${section.id}[]`}
                                            defaultValue={option.value}
                                            type="checkbox"
                                            defaultChecked={option.checked}
                                            onChange={(e) =>
                                              handleFilter(e, section, option)
                                            }
                                            className="h-4 w-4 rounded border-gray-300 text-[#2c515d]"
                                          />
                                          <label
                                            htmlFor={`filter-${section.id}-${
                                              optionIdx + 10
                                            }`}
                                            className="ml-3 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] "
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </Command>
                            </ScrollArea>
                          </SheetContent>
                        </Sheet>
                      </div>
                    )}
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
