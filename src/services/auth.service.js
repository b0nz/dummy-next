import { instance } from "./api"

export async function login({ payload }) {
  const res = await instance.post("/auth/login", payload)
  return res.data
}