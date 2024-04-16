import { Box, Skeleton } from "@mui/material";
import Header from "../components/Header/Header";
import Table from "../components/Table";
import { Pagination } from "../components/Pagination";
import { useMemo, useState } from "react";
import AddModal from "../components/AddModal";
import EditModal from "../components/EditModal";
import { FetchData, FetchToken } from "../api/Fetch";
import { useQuery } from "react-query";

function Stock() {
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [itemName, setItemName] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [element, setElement] = useState(() => ({
    id: "",
    name: "",
    measurement_units: "",
    code: "",
    description: "",
  }));

  const { data, isLoading } = useQuery(
    ["elements", [page, pageSize, itemName, token]],
    () => GetData(page, pageSize, itemName)
  );

  if (!sessionStorage.getItem("token")) {
    async function GetToken() {
      setToken(await FetchToken());
    }
    GetToken();
  }

  async function GetData(page: number, pageSize: number, itemName: string) {
    if (token) return await FetchData(page, pageSize, itemName);
  }

  const HeaderMemoized = useMemo(
    () => (
      <Header
        setState={setAddModal}
        count={data && data.total}
        setItemName={setItemName}
      />
    ),
    [data]
  );
  const TableMemoized = useMemo(
    () => (
      <Table
        setState={setEditModal}
        setElement={setElement}
        data={data && data.result}
      />
    ),
    [data]
  );
  const PaginationMemoized = useMemo(
    () => (
      <Pagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pages={data && Math.ceil(data.total / pageSize)}
      />
    ),
    [page, pageSize, data]
  );
  const AddModalMemoized = useMemo(
    () => <AddModal state={addModal} setState={setAddModal} />,
    [addModal]
  );
  const EditModalMemoized = useMemo(
    () => (
      <EditModal state={editModal} setState={setEditModal} element={element} />
    ),
    [editModal]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "15px 30px",
        gap: "60px",
      }}
    >
      {/* хедер */}
      {HeaderMemoized}

      {/* таблица */}
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          {Array.from({ length: 10 }, () => 0).map((_, index) => (
            <Skeleton key={index} sx={{ height: "50px" }} />
          ))}
        </Box>
      ) : (
        TableMemoized
      )}

      {/* пагинация */}
      {PaginationMemoized}

      {/* Модалка Добавления */}
      {AddModalMemoized}

      {/* Модалка Изменения */}
      {EditModalMemoized}
    </Box>
  );
}

export default Stock;
