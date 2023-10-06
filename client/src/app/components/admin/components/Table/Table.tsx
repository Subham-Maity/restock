import React, { useState } from "react";
import { Column, DataRow } from "./SubTableTypes";

export const Table = ({
                          columns,
                          rows,
                      }: {
    columns: Column[];
    rows: DataRow[];
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortColumn, setSortColumn] = useState<keyof DataRow | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (columnId: keyof DataRow) => {
        if (sortColumn === columnId) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(columnId);
            setSortDirection("asc");
        }
    };

    const filteredRows: DataRow[] = (rows || []).filter(
        (row: DataRow) =>
            (row.token || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
            (row.price || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.lastUpdated || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.tradingDate || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.buys || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.sells || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.txns || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.volume || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.liquidity || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.fdv || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.age || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.fiveM || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.oneH || "").toString().includes(searchQuery.toLowerCase()) ||
            (row.twentyH || "").toString().includes(searchQuery.toLowerCase()),
    );

    const sortedRows: DataRow[] = [...filteredRows];
    if (sortColumn !== null) {
        sortedRows.sort((a, b) => {
            const aValue = a[sortColumn] as number | string; // Explicitly cast to number|string
            const bValue = b[sortColumn] as number | string; // Explicitly cast to number|string

            if (typeof aValue === "string" && typeof bValue === "string") {
                return sortDirection === "asc"
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            } else {
                const numericAValue =
                    typeof aValue === "string" ? parseFloat(aValue) : aValue;
                const numericBValue =
                    typeof bValue === "string" ? parseFloat(bValue) : bValue;

                return sortDirection === "asc"
                    ? numericAValue - numericBValue
                    : numericBValue - numericAValue;
            }
        });
    }

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div className="table-container lg:ml-1 lg:mr-1 border border-gray-400/75 dark:border-gray-600/75  items-center overflow-hidden overflow-y-auto">
            <div className="h-full text-sm rounded-md p-2 bg-gradient-to-r from-zinc-200 via-neutral-200/25 to-slate-200/25 dark:from-zinc-800 dark:via-neutral-900/25 dark:to-slate-700/25">
                {/*<input*/}
                {/*    type="search"*/}
                {/*    placeholder="Search in table.........."*/}
                {/*    className="w-full text-sm py-0.5 px-0.5 h-8 border border-gray-400/75 dark:border-gray-600/75 focus:outline-none bg-gray-200 dark:bg-gradient-to-r dark:from-stone-800 dark:to-slate-900/75 pr-16 rounded-sm"*/}
                {/*    value={searchQuery}*/}
                {/*    onChange={(e) => setSearchQuery(e.target.value)}*/}
                {/*/>*/}


                <div className="flex">
                <form className="w-full">
                    <label htmlFor="default-search"
                           className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                      strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>

                        <input type="search" id="default-search"
                               className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder="Search Mockups, Logos..." required/>
                            <button type="submit"
                                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
                            </button>

                    </div>

                </form>


                </div>


                <div className="mt-4  rounded-lg overflow-x-auto">
                    <div className="relative max-h-[600px] overflow-y-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {columns?.map((column) => (
                                    <th
                                        key={column.id}
                                        className="py-2 px-4 text-left overflow-y-auto cursor-pointer"
                                        style={{ minWidth: column.minWidth }}
                                        onClick={() => handleSort(column.id)}
                                    >
                                        {column.label}
                                        {sortColumn === column.id && (
                                            <span className="ml-1">
                          {sortDirection === "asc" ? "↑" : "↓"}
                        </span>
                                        )}
                                    </th>
                                ))}
                                <th  className="py-2 px-4 text-left overflow-y-auto cursor-pointer">

                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: DataRow, rowIndex: number) => (
                                    <tr
                                        key={row.token}
                                        className="bg-white text-gray-800 dark:text-white dark:bg-gray-800 "
                                    >
                                        {columns?.map((column: Column, columnIndex: number) => (
                                            <td
                                                key={column.id}
                                                className={`py-2 px-4 ${
                                                    columnIndex !== 0
                                                        ? "border border-gray-800/25  dark:border-gray-400/25 "
                                                        : ""
                                                }`}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {row[column.id]}
                                            </td>
                                        ))}
                                        <div className="flex text-gray-800 dark:text-white items-center justify-center align-middle">
                                        <button type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit
                                        </button>
                                        <button type="button"
                                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 m-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete
                                        </button>
                                        </div>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm">
                        Showing {page * rowsPerPage + 1} to{" "}
                        {Math.min((page + 1) * rowsPerPage, sortedRows.length)} of{" "}
                        {sortedRows.length} entries
                    </div>
                    <div className="space-x-2">
                        <select
                            className="border rounded-md px-2 py-1 text-sm"
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            defaultValue={25}
                        >
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                </div>
                <div className="flex mt-4 gap-4">
                    <button
                        className="border border-gray-800/25 dark:border-gray-500 rounded-md px-4 py-1 text-sm bg-slate-300/25 hover:bg-slate-600/50 text-gray-900 dark:text-white"
                        onClick={() => handleChangePage(page - 1)}
                        disabled={page === 0}
                    >
                        Previous
                    </button>
                    <button
                        className="border border-gray-800/25 dark:border-gray-500 rounded-md px-4 py-1 text-sm bg-slate-300/25 hover:bg-slate-600/50 text-gray-900 dark:text-white"
                        onClick={() => handleChangePage(page + 1)}
                        disabled={(page + 1) * rowsPerPage >= sortedRows.length}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};
