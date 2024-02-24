import { ITEMS_PER_PAGE } from "@/constant/constants";
import React from "react";
import { Pagination } from "@nextui-org/react";
export function PaginationPage({
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
    <div className="flex justify-between items-center">
      <div className="hidden lg:block">
        Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
        {page * ITEMS_PER_PAGE > totalItems
          ? totalItems
          : page * ITEMS_PER_PAGE}{" "}
        of {totalItems} results
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
