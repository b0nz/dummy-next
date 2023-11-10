import axios from "axios"

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})
instance.defaults.headers.common["Content-Type"] = "application/json"
