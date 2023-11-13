import MockAdapter from "axios-mock-adapter"
import { instance } from "../api"
import { login } from "../auth.service"

const mock = new MockAdapter(instance)

const mockUserResponse = {
  id: 15,
  username: "kminchelle",
  email: "kminchelle@qq.com",
  firstName: "Jeanne",
  lastName: "Halvorson",
  gender: "female",
  image: "https://robohash.org/autquiaut.png",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY5OTg0NDA3OCwiZXhwIjoxNjk5ODQ3Njc4fQ.4psXy2g2dwIp6Xdb5wnrVKLqxVINj5X6iqmhnol_CX0",
}

describe("AuthService", () => {
  beforeAll(() => {
    mock.onPost("/auth/login").reply(200, mockUserResponse)
  })

  it("should return a token when login is called", async () => {
    const { token } = await login({
      username: "kminchelle",
      password: "password",
    })
    expect(token).toEqual(mockUserResponse.token)
  })
})
