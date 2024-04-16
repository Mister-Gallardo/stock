import BasicTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Typography } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useEffect, useState } from "react";

export interface IElement {
  id: string;
  name: string;
  measurement_units: string;
  code: string;
  description: string;
}

export default function Table({
  setState,
  setElement,
  data,
}: {
  setState: (newState: boolean) => void;
  setElement: (newElement: IElement) => void;
  data: IElement[];
}) {
  // console.log('table')

  const [table, setTable] = useState<IElement[]>();

  useEffect(() => {
    setTable(data);
  }, [data]);

  function handleSortUp() {
    setTable(
      [...data].sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      })
    );
    // console.log(table)
  }
  function handleSortDown() {
    setTable(
      [...data].sort((a, b) => {
        if (a.name < b.name) {
          return 1;
        } else if (a.name > b.name) {
          return -1;
        } else {
          return 0;
        }
      })
    );
    // console.log(table)
  }

  return (
    <BasicTable sx={{ width: "100%" }} aria-label="simple table">
      <TableHead>
        <TableRow sx={{ backgroundColor: "#F6F4F4" }}>
          <TableCell
            sx={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Название
            </Typography>
            <IconButton sx={{ padding: "3px" }} onClick={handleSortDown}>
              <ArrowCircleDownIcon />
            </IconButton>
            <IconButton sx={{ padding: "3px" }} onClick={handleSortUp}>
              <ArrowCircleUpIcon />
            </IconButton>
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
            Единица измерения
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
            Артикул/код
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {table &&
          table.map((row: IElement) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell sx={{ fontSize: "15px" }}>{row.name}</TableCell>
              <TableCell sx={{ fontSize: "15px" }}>
                {row.measurement_units}
              </TableCell>
              <TableCell sx={{ fontSize: "15px" }}>{row.code}</TableCell>
              <TableCell align="right">
                <IconButton
                  onClick={() => {
                    setElement(row);
                    setState(true);
                  }}
                  sx={{ border: "2px solid #F2EEEE", borderRadius: "10px" }}
                >
                  <EditIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </BasicTable>
  );
}
