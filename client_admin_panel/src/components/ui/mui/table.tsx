import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Context from "@/store/context/context";

interface InfoTableProps {
  infoData: any | null;
  labels: string[];
  dark: string;
  light: string;
}

const InfoTable: React.FC<InfoTableProps> = ({
  infoData,
  labels,
  dark,
  light,
}) => {
  const { isDarkTheme } = useContext(Context);
  const values = Object.values(infoData);
  const cellColor = isDarkTheme ? dark : light;

  // State to manage column visibility. Initially, all columns are visible.
  const [visibleColumns, setVisibleColumns] = useState(labels);

  // Function to toggle column visibility
  const toggleColumnVisibility = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((c) => c !== column)
        : [...prev, column],
    );
  };

  return (
    <>
      <div
        style={{
          display: "inline-block",
          border: "1px solid #515151",
          borderRadius: "4px",
          padding: "8px",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        {/* Checkboxes to toggle column visibility */}
        {labels.map((label: string, index: number) => (
          <FormControlLabel
            key={label}
            style={{ fontSize: "0.2rem", opacity: "0.6" }}
            control={
              <Checkbox
                color="secondary"
                checked={visibleColumns.includes(label)}
                onChange={() => toggleColumnVisibility(label)}
              />
            }
            label={label}
          />
        ))}

        <TableContainer
          component={Paper}
          style={{ maxWidth: "100%", overflowX: "auto", marginTop: "1rem" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {labels.map(
                  (label, index) =>
                    visibleColumns.includes(label) && (
                      <TableCell
                        key={index}
                        style={{
                          backgroundColor: cellColor,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {label}
                      </TableCell>
                    ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {values.map(
                  (value: any, index) =>
                    visibleColumns.includes(labels[index]) && (
                      <TableCell
                        key={index}
                        style={{
                          backgroundColor: cellColor,
                          wordWrap: "break-word",
                          maxWidth: "150px",
                        }}
                      >
                        {value}
                      </TableCell>
                    ),
                )}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default InfoTable;
