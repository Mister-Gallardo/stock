import { Box, Typography } from "@mui/material";
import BasicPagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function Pagination({
  page,
  setPage,
  pageSize,
  setPageSize,
  pages,
}: {
  page: number;
  setPage: (number: number) => void;
  pageSize: number;
  setPageSize: (number: number) => void;
  pages: number;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    setPageSize(+event.target.value);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // console.log('pagination')

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <BasicPagination
        count={pages}
        shape="rounded"
        size="large"
        color="error"
        page={page}
        onChange={handleChangePage}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography sx={{ color: "#514A4A", fontSize: 17 }}>
          Показывать по:{" "}
        </Typography>
        <Select
          sx={{
            width: 80,
            height: "40px",
            backgroundColor: "#514A4A",
            color: "white",
            "& .MuiSelect-icon": { color: "white" },
          }}
          value={`${pageSize}`}
          onChange={handleChange}
          IconComponent={KeyboardArrowDownIcon}
        >
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="50">50</MenuItem>
          <MenuItem value="100">100</MenuItem>
        </Select>
      </Box>
    </Box>
  );
}
