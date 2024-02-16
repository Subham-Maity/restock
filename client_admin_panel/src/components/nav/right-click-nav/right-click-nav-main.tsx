import React from "react";
import RightClickNavControl from "@/components/nav/right-click-nav/right-click-nav-control";
import {
  ContextMenu,
  ContextMenuTrigger,
} from "@/components/ui/shadcn/context-menu";

const RightClickNavMain = ({ children }: { children: React.ReactNode }) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <RightClickNavControl />
    </ContextMenu>
  );
};

export default RightClickNavMain;
