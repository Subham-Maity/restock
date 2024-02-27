import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { ColumnHeader } from "@/components/data-table/components/column-header";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
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
import { Product } from "@/components/data-table/main";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <ColumnHeader column={column} title="Title" />,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => <ColumnHeader column={column} title="Price" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "discountPercentage",
    header: ({ column }) => <ColumnHeader column={column} title="Discount" />,

    cell: ({ row }) => {
      const discount = parseFloat(row.getValue("discountPercentage"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "percent",
        minimumFractionDigits: 2,
      }).format(discount / 100);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "discountPrice",
    header: ({ column }) => (
      <ColumnHeader column={column} title="Discount Price" />
    ),
    cell: ({ row }) => {
      const discountPrice = parseFloat(row.getValue("discountPrice"));

      if (isNaN(discountPrice)) {
        return (
          <div className="text-right font-medium">
            No discount price present
          </div>
        );
      }

      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(discountPrice);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "rating",

    header: ({ column }) => <ColumnHeader column={column} title="Rating" />,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("rating")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <ColumnHeader column={column} title="Stock" />,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("stock")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("brand")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
    cell: ({ row }) => (
      <Image
        src={row.getValue("thumbnail")}
        alt={row.getValue("title")}
        width={40}
        height={40}
        className="rounded-md"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }: { row: any }) => (
      <div className="grid grid-cols-2 gap-2 items-center justify-center">
        {row.getValue("images").map((image: string | StaticImport) => (
          <Image
            src={image}
            alt={row.getValue("title")}
            width={40}
            height={40}
            className="rounded-md"
          />
        ))}
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
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
              onClick={() => navigator.clipboard.writeText(ids.id)}
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
