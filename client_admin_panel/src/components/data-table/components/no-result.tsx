import React from "react";
import { TableCell, TableRow } from "@/components/ui/shadcn/table";
import { columns } from "@/components/data-table/components/column defs/column-defs";

const NoResult = () => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-24 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

export default NoResult;
