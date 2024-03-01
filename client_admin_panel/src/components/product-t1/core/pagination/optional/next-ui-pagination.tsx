import { ITEMS_PER_PAGE } from "@/constant/constants";
import React from "react";
import { Pagination } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/redux/useSelector";
import { selectTotalItems } from "@/lib/features/product/product-pc-slice";
import PaginationSkeleton from "@/loader/skeleton/product-t1/pagination-skeleton";
import { defaultUrlPagination } from "@/links/product-list";

export function PaginationPage() {
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("_page") || "1");
  const totalItems = useAppSelector(selectTotalItems);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("_page", newPage.toString());
    router.push(`${defaultUrlPagination}${newSearchParams.toString()}`);
  };

  if (!totalItems) {
    return <PaginationSkeleton />;
  }

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
        initialPage={1}
        showControls
        showShadow
        boundaries={2}
        total={totalPages || 1}
        page={page || 1}
        onChange={handlePageChange}
        color="primary"
        variant="bordered"
      />
    </div>
  );
}
