import React, { useState } from "react";

import { sortOptions } from "@/config/sort/sort-config";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { MoveDown, MoveUp, Star } from "lucide-react";
import { TypographyMuted } from "@/components/ui/typography/typography";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Sort = ({ handleSort }: { handleSort: any }) => {
  const [selectedOption, setSelectedOption] = useState("Sort");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const handleSelect = (option: {
    current: boolean;
    name: string;
    sort: string;
    order: string;
  }) => {
    handleSort(option);
    setSelectedOption(option.name);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("_sort", option.sort);
    newSearchParams.set("_order", option.order);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TypographyMuted className="default-card-2 p-0.5 lg:p-2">
            {selectedOption}
          </TypographyMuted>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="default-card-2">
          <DropdownMenuGroup>
            {sortOptions.map((option) => {
              const lastWord = option.name.split(" ").pop();
              let icon;
              if (lastWord === "High") {
                icon = <MoveUp />;
              } else if (lastWord === "Low") {
                icon = <MoveDown />;
              } else {
                icon = <Star className="mr-1" />;
              }
              return (
                <DropdownMenuItem
                  key={option.name}
                  onSelect={() => handleSelect(option)}
                >
                  {icon}
                  {option.name}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Sort;
