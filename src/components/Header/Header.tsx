import { Box, Button, Typography } from "@mui/material";
import { debounce } from "lodash";
import "./Header.css";

function Header({
  setState,
  count,
  setItemName,
}: {
  setState: (newState: boolean) => void;
  count: number;
  setItemName: (newState: string) => void;
}) {
  const debouncedSetItemName = debounce((value: string) => {
    setItemName(value);
  }, 30);

  // console.log('header')

  return (
    <Box
      className="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Typography sx={{ fontSize: "32px", fontWeight: "600" }}>
          Номенклатура
        </Typography>
        <Typography
          sx={{
            display: "inline-block",
            fontSize: "14px",
            borderRadius: "5px",
            padding: "2px 6px",
            color: "white",
            backgroundColor: "#C32F2F",
          }}
        >
          {count ? `${count} единиц` : "__ единиц"}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex" }}>
          <input
            placeholder="Поиск по названию"
            // value={itemName}
            onChange={(e) => debouncedSetItemName(e.target.value)}
            style={{
              paddingLeft: 16,
              borderTopLeftRadius: "5px",
              border: "1px solid grey",
              borderEndStartRadius: "5px",
            }}
          ></input>
          <button
            className="header_button1"
            type="button"
            style={{
              marginLeft: "-1px",
              padding: 6,
              fontSize: "14px",
              backgroundColor: "#514A4A",
              color: "white",
              border: "2px solid #514A4A",
              borderTopRightRadius: "5px",
              borderEndEndRadius: "5px",
            }}
          >
            Поиск
          </button>
        </Box>
        <Button
          onClick={() => setState(true)}
          variant="contained"
          color="error"
          sx={{ textTransform: "none", boxShadow: 0 }}
        >
          + Новая позиция
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
