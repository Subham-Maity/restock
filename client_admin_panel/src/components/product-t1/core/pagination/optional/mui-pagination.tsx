import { ITEMS_PER_PAGE } from "@/constant/constants";
import { Pagination, Stack } from "@mui/material";

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
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <div>
        Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
        {page * ITEMS_PER_PAGE > totalItems
          ? totalItems
          : page * ITEMS_PER_PAGE}{" "}
        of {totalItems} results
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => handlePage(value)}
        variant="outlined"
        color="primary"
      />
    </Stack>
  );
}
