import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { sortOptions } from "@/config/sort/sort-config";
import { SortOption } from "@/types/utility/core/sort/sort.type";
import { classNames } from "@/middleware/class/class";

const Sort = ({ sort, handleSort }: { sort: SortOption; handleSort: any }) => {
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-white">
            Sort
            <ChevronDownIcon
              className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-8 w-48 origin-top-right bg-slate-200 dark:bg-slate-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-2xl font-semibold space-x-2">
            <div className="">
              {sortOptions.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <p
                      onClick={() => handleSort(option)}
                      className={classNames(
                        option.current ? "" : " rounded-2xl",
                        active ? "" : "",
                        "block py-2 px-3 text-sm rounded cursor-pointer hover:bg-gray-400 hover:dark:bg-gray-500 text-black dark:text-white",
                      )}
                    >
                      {option.name}
                    </p>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Sort;
