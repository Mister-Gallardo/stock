import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import AirplayIcon from "@mui/icons-material/Airplay";
import ClearIcon from "@mui/icons-material/Clear";
import { TextField, Typography, IconButton } from "@mui/material";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { IElement } from "./Table";
import { useMutation, useQueryClient } from "react-query";
import { EditData } from "../api/Fetch";

export default function EditModal({
  state,
  setState,
  element,
}: {
  state: boolean;
  setState: (newState: boolean) => void;
  element: IElement;
}) {
  const { register, handleSubmit, reset } = useForm<IElement>();
  const queryClient = useQueryClient();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const createElement = useMutation({
    mutationFn: EditElement,
    onSuccess() {
      console.log("УСПЕШНО");
      reset();
      queryClient.refetchQueries(["elements"]);
    },
    onError(error) {
      console.log(error);
    },
  });

  const submitOnValid: SubmitHandler<IElement> = (data) => {
    data = { ...data, id: element.id };
    createElement.mutate(data);
  };

  const submitOnInValid: SubmitErrorHandler<IElement> = (data) => {
    console.log(data);
  };

  async function EditElement(data: IElement) {
    await EditData(data);
  }

  // console.log("editModal");

  const list = () => (
    <Box
      sx={{
        width: 450,
        padding: "15px 20px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "inline-block",
            padding: "8px 12px",
            borderRadius: "10px",
            backgroundColor: "#FAF4F4",
          }}
        >
          <AirplayIcon sx={{ fontSize: 30, color: "#A85757" }} />
        </Box>
        <IconButton onClick={toggleDrawer(false)}>
          <ClearIcon />
        </IconButton>
      </Box>

      <form
        onSubmit={handleSubmit(submitOnValid, submitOnInValid)}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              {element.name}
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "grey" }}>
              Все поля должны быть заполнены
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px" }}>Название</Typography>
            <TextField
              {...register("name", { required: true })}
              size="small"
              label={element.name ? element.name : "Введите значение"}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px" }}>Единица измерения</Typography>
            <TextField
              {...register("measurement_units")}
              size="small"
              label={
                element.measurement_units
                  ? element.measurement_units
                  : "Введите значение"
              }
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px" }}>Артикул/код</Typography>
            <TextField
              {...register("code")}
              size="small"
              label={element.code ? element.code : "Введите значение"}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px" }}>Описание</Typography>
            <TextField
              {...register("description")}
              size="small"
              label={
                element.description ? element.description : "Введите значение"
              }
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "12px" }}>
          <Button
            variant="contained"
            type="button"
            onClick={toggleDrawer(false)}
            sx={{
              width: "calc(50% - 6px)",
              backgroundColor: "#514A4A",
              textTransform: "none",
              ":hover": { backgroundColor: "red" },
            }}
          >
            Отмена
          </Button>
          <Button
            variant="contained"
            type="submit"
            onClick={toggleDrawer(false)}
            sx={{
              width: "calc(50% - 6px)",
              backgroundColor: "#A85757",
              textTransform: "none",
              ":hover": { backgroundColor: "green" },
            }}
          >
            Подтвердить
          </Button>
        </Box>
      </form>
    </Box>
  );

  return (
    <Box>
      <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Box>
  );
}
