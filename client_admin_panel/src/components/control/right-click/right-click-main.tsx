import React from "react";
import RightClickControl from "@/components/control/right-click/right-click-control";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/shadcn/context-menu";

const RightClickMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <RightClickControl />
    </ContextMenu>
  );
};

export default RightClickMain;
