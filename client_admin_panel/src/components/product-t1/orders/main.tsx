"use client";

import * as React from "react";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/shadcn/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { useAppSelector } from "@/store/redux/useSelector";
import { DataTablePagination } from "@/components/data-table/pagination";
import NoResult from "@/components/data-table/no-result";
import { Order } from "@/types/redux-slice/order/order.slice.type";
import {
  selectOrders,
  selectTotalOrders,
} from "@/lib/features/order/order-slice";
import { columns } from "@/components/product-t1/orders/column defs/column-defs";
import { DataTableViewOptions } from "@/components/data-table/view-options";
import { AppDispatch } from "@/store/redux/store";
import { useDispatch } from "react-redux";
import { SortOption } from "@/types/utility/core/sort/sort.type";
import {
  fetchAllOrdersAsync,
  updateOrderAsync,
} from "@/lib/features/order/order-async-thunk";
import { ITEMS_PER_PAGE } from "@/constant/constants";

export default function TableMain() {
  const [page, setPage] = useState(1);
  const dispatch: AppDispatch = useDispatch();
  const data: Order[] = useAppSelector(selectOrders);

  console.log(data);
  const totalOrders = useAppSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState<SortOption>({
    _sort: "rating",
    _order: "desc",
  } as SortOption);

  const handleEdit = (order: Order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {};

  const handleUpdate = (e: ChangeEvent<HTMLSelectElement>, order: Order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page: SetStateAction<number>) => {
    setPage(page);
  };

  const handleSort = (sortOption: { sort: any; order: any }) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

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

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 ">
        <Input
          placeholder="Filter by title"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm default-card"
        />
        <DataTableViewOptions table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <NoResult />
            )}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-2.5">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
