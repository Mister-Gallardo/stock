import axios from "axios";
import { IElement } from "../components/Table";

export async function FetchToken() {
  const response = await axios.post(
    "https://hcateringback-dev.unitbeandev.com/api/auth/login",
    {
      login: "admin",
      password: "admin",
    }
  );
  sessionStorage.setItem("token", response.data.access_token);
  return response.data.access_token;
}
export async function FetchData(page: number, pageSize: number, itemName: string) {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.get(
      `https://hcateringback-dev.unitbeandev.com/api/wh/items?page=${page}&pageSize=${pageSize}&itemName=${itemName}`,
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error: any) {
    console.log("Ошибка:", error.message);
  }
}

export async function PostData({
  name,
  measurement_units,
  code,
  description,
}: IElement) {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.post(
      "https://hcateringback-dev.unitbeandev.com/api/wh/items",
      {
        name: name,
        description: description,
        measurement_units: measurement_units,
        code: code,
      },
      { headers: { Authorization: token } }
    );
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.log("Ошибка:", error.message);
  }
}

export async function EditData({
  id,
  name,
  measurement_units,
  code,
  description,
}: IElement) {
  const token = sessionStorage.getItem("token");
  try {
    const response = await axios.patch(
      `https://hcateringback-dev.unitbeandev.com/api/wh/items/${id}`,
      {
        name: name,
        description: description,
        measurement_units: measurement_units,
        code: code,
      },
      { headers: { Authorization: token } }
    );
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    console.log("Ошибка:", error.message);
  }
}

