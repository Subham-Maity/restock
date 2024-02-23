import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/shadcn/pagination";
import { ITEMS_PER_PAGE } from "@/constant/constants";
import { Button } from "@/components/ui/shadcn/button";

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
              onClick={() => handlePage(page > 1 ? page - 1 : page)}
            >
              Previous
            </Button>
          </PaginationItem>
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={index + 1 === page}
                onClick={() => handlePage(index + 1)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {page < totalPages && <PaginationEllipsis />}
          <PaginationItem>
            <Button
              variant="secondary"
              onClick={() => handlePage(page < totalPages ? page + 1 : page)}
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
