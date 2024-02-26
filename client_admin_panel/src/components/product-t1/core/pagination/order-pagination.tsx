import { ITEMS_PER_PAGE } from "@/constant/constants";
import React from "react";
import { Pagination } from "@nextui-org/react";

export function OrderPaginationPage({
  page,
  handlePage,
  totalItems,
}: {
  page: number;
  handlePage: (page: number) => void;
  totalItems: number;
}) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
      <div className="hidden lg:block">
        <p className="text-sm text-gray-700 dark:text-gray-200">
          Showing
          <span className="font-medium">
            {(page - 1) * ITEMS_PER_PAGE + 1}
          </span>{" "}
          to
          <span className="font-medium">
            {page * ITEMS_PER_PAGE > totalItems
              ? totalItems
              : page * ITEMS_PER_PAGE}
          </span>
          of <span className="font-medium">{totalItems}</span> results
        </p>
      </div>
      <Pagination
        loop
        showControls
        showShadow
        boundaries={2}
        total={totalPages}
        page={page}
        onChange={(value) => handlePage(value)}
        color="primary"
        variant="bordered"
      />
    </div>
  );
}
