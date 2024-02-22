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

const chooseSideLeft = SHEET_SIDES[3];
const MoreOptions = ({ options, section, handleFilter }: any) => (
  <div>
    <Sheet>
      <SheetTrigger className="text-md ml-2 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] ">
        +{options.length - 10} more
      </SheetTrigger>
      <SheetContent side={chooseSideLeft} className="w-full">
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
              {options.map((option: any, optionIdx: any) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    handleFilter(null, section, option);
                  }}
                >
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${section.id}-${optionIdx + 10}`}
                      name={`${section.id}[]`}
                      defaultValue={option.value}
                      type="checkbox"
                      defaultChecked={option.checked}
                      onChange={(e) => handleFilter(e, section, option)}
                      className="h-4 w-4 rounded border-gray-300 text-[#2c515d]"
                    />
                    <label
                      htmlFor={`filter-${section.id}-${optionIdx + 10}`}
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
);

export default MoreOptions;
