import MockAdapter from "axios-mock-adapter"
import { BASE_URL, instance } from "../api"

const mock = new MockAdapter(instance)

describe("api", () => {
  afterEach(() => {
    mock.reset() // Reset the mock after each test
  })

  it("should create an axios instance with the correct baseURL", () => {
    expect(instance.defaults.baseURL).toBe(BASE_URL)
  })

  it("should set the Content-Type header to application/json", () => {
    const contentTypeHeader = instance.defaults.headers.common["Content-Type"]
    expect(contentTypeHeader).toBe("application/json")
  })

  it("should set the timeout to 10000 milliseconds", () => {
    expect(instance.defaults.timeout).toBe(10000)
  })
})
