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
import { PostData } from "../api/Fetch";

export default function AddModal({
  state,
  setState,
}: {
  state: boolean;
  setState: (newState: boolean) => void;
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
    mutationFn: PostElement,
    onSuccess() {
      console.log("УСПЕШНО");
      reset();
      queryClient.invalidateQueries(["elements"]);
    },
    onError(error) {
      console.log(error);
    },
  });

  const submitOnValid: SubmitHandler<IElement> = (data) => {
    createElement.mutate(data);
  };

  const submitOnInValid: SubmitErrorHandler<IElement> = (data) => {
    console.log(data);
  };

  async function PostElement(data: IElement) {
    await PostData(data);
  }

  // console.log('addModal')

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
              Новая позиция
            </Typography>
            <Typography sx={{ fontSize: "16px", color: "grey" }}>
              Заполните все поля для создания новой номенклатуры
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px", color: "black" }}>
              Название
            </Typography>
            <TextField
              {...register("name", { required: true })}
              size="small"
              label="Введите значение"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px", color: "black" }}>
              Единица измерения
            </Typography>
            <TextField
              {...register("measurement_units", { required: true })}
              size="small"
              label="Введите значение"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px", color: "black" }}>
              Артикул/код
            </Typography>
            <TextField
              {...register("code", { required: true })}
              size="small"
              label="Введите значение"
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ fontSize: "16px", color: "black" }}>
              Описание
            </Typography>
            <TextField
              {...register("description", { required: true })}
              size="small"
              label="Введите значение"
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
