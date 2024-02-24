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
import Checkbox from "@/components/product-t1/core/filter/common/checkbox";

const SHEET_SIDES = ["top", "right", "bottom", "left"] as const;

const chooseSideLeft = SHEET_SIDES[3];
const MoreOptions = ({ options, section, handleFilter }: any) => (
  <div>
    <Sheet>
      <SheetTrigger className="text-md ml-2 text-sm text-gray-600 dark:text-white dark:hover:text-[#5ccef8] ">
        +{options.length - 10} more
      </SheetTrigger>
      <SheetContent side={chooseSideLeft} className="w-full">
        <Command>
          <CommandInput
            placeholder={`Search for ${section.name}`}
            className="w-full dark:hover:bg-stone-800 shadow-2xl rounded-md h-9 mt-2 mb-2"
          />

          <CommandEmpty className="default-card-2">
            No options found
          </CommandEmpty>
          <CommandGroup className="default-card-2">
            <ScrollArea className="h-[600px] w-full rounded-md border p-4">
              {options.map((option: any, optionIdx: any) => (
                <CommandItem
                  value={option.label}
                  key={option.value}
                  onSelect={() => {
                    handleFilter(null, section, option);
                  }}
                >
                  <div key={option.value} className="flex items-center">
                    <Checkbox
                      option={option}
                      section={section}
                      handleFilter={handleFilter}
                      optionIdx={optionIdx}
                    />
                  </div>
                </CommandItem>
              ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
      </SheetContent>
    </Sheet>
  </div>
);

export default MoreOptions;
