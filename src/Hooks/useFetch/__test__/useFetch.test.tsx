import { renderHook } from "@testing-library/react"
import axios from "axios"

import MockAdapter from "axios-mock-adapter"
import { mockData } from "../../../__mock__/mockData"
import { useFetch } from "../useFetch"

const PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/todos"

describe("Usefetch", () => {
  test("useFetch performs GET request", async () => {
    const mock = new MockAdapter(axios)

    mock.onGet(PLACEHOLDER_URL).reply(200, mockData)

    const { result, rerender } = renderHook(() => useFetch(PLACEHOLDER_URL))

    expect(result.current).toEqual([])

    rerender()

    expect(result.current).toEqual(mockData)
  })
  test("useFetch should display error", async () => {
    const mock = new MockAdapter(axios)

    mock.onGet(PLACEHOLDER_URL).reply(404, mockData)

    const { result, rerender } = renderHook(() => useFetch(PLACEHOLDER_URL))

    expect(result.current.error).toEqual("")

    rerender()

    expect(result.current.error).toEqual("Can't fetch data")
  })
})
