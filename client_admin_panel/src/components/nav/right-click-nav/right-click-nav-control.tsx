import React from "react";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
} from "@/components/ui/shadcn/context-menu";

const RightClickNavControl = () => {
  return (
    <ContextMenuContent className="w-64">
      <ContextMenuItem inset>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  );
};

export default RightClickNavControl;
