import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/shadcn/pagination";
import { ITEMS_PER_PAGE } from "@/constant/constants";
import { Button } from "@/components/ui/shadcn/button";
import { useAppSelector } from "@/store/redux/useSelector";
import { selectTotalItems } from "@/lib/features/product/product-pc-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PaginationSkeleton from "@/loader/skeleton/product-t1/pagination-skeleton";

export function PaginationPage() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("_page") || "1"));
  const totalItems = useAppSelector(selectTotalItems);
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const newPage = parseInt(searchParams.get("_page") || "1");
    setPage(newPage);
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("_page", newPage.toString());
    router.push(`${path}?${newSearchParams.toString()}`);
  };

  if (!totalItems) {
    return <PaginationSkeleton />;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center">
      <p className="text-sm text-gray-700 dark:text-gray-200 mb-2 sm:mb-0">
        Showing
        <span className="font-medium">{(page - 1) * ITEMS_PER_PAGE + 1}</span>
        to
        <span className="font-medium">
          {page * ITEMS_PER_PAGE > totalItems
            ? totalItems
            : page * ITEMS_PER_PAGE}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> results
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              variant="secondary"
              onClick={() => handlePageChange(page > 1 ? page - 1 : page)}
            >
              Previous
            </Button>
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === page}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page < totalPages && <PaginationEllipsis />}
          <PaginationItem>
            <Button
              variant="secondary"
              onClick={() =>
                handlePageChange(page < totalPages ? page + 1 : page)
              }
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
