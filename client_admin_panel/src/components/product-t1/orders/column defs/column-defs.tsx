import { ColumnDef } from "@tanstack/react-table";
import { ColumnHeader } from "@/components/data-table/column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";
import { Order } from "@/types/redux-slice/order/order.slice.type";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ORDER#",
    cell: ({ row }) => {
      const id = row.getValue("id") as string;
      return (
        <div className="capitalize">
          {id.length > 2 ? `${id.slice(0, 2)}..` : id}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const discountPrice = parseFloat(row.getValue("totalAmount"));

      if (isNaN(discountPrice)) {
        return <div className="font-medium">No price present</div>;
      }

      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(discountPrice);

      return <div className="font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "selectedAddress",
    header: "SHIPPING ADDRESS",
    cell: ({ row }) => {
      const address = row.getValue("selectedAddress") as Address;
      return (
        <div className="py-3 px-6 ">
          <div>{address?.name}</div>
          <div>{address?.email}</div>
          <div>{address?.street}</div>
          <div>{address.city}</div>
          <div>{address.state}</div>
          <div>{address.pinCode}</div>
          <div>{address.phone}</div>
        </div>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <ColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const chooseColor = (status: string) => {
        switch (status) {
          case "pending":
            return "bg-purple-200 text-purple-600";
          case "dispatched":
            return "bg-yellow-200 text-yellow-600";
          case "delivered":
            return "bg-green-200 text-green-600";
          case "cancelled":
            return "bg-red-200 text-red-600";
          default:
            return "bg-purple-200 text-purple-600";
        }
      };
      const status = row.getValue("status") as string;
      const colorClass = chooseColor(status);
      return (
        <span className={`${colorClass} py-1 px-3 rounded-full text-xs`}>
          {status}
        </span>
      );
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const ids = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(ids.id))}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
