/* eslint-disable testing-library/prefer-query-by-disappearance */
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import renderer from "react-test-renderer"
import "@testing-library/jest-dom"
import Home from "../Home"
import { mockData } from "../../../__mock__/mockData"

const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe("Home Componennt", () => {
  test("match Home Page SnapShot", () => {
    const tree = renderer.create(<MockHome />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  describe("input", () => {
    test("input is in the page", () => {
      render(<MockHome />)
      const inputElement = screen.getByPlaceholderText(/search todo.../i)
      expect(inputElement).toBeInTheDocument()
    })
    test("input works", () => {
      render(<MockHome />)
      const inputElement = screen.getByLabelText("todo-input") as HTMLInputElement
      fireEvent.change(inputElement, { target: { value: "soap" } })
      expect(inputElement.value).toBe("soap")
    })
  })

  describe("todo list test", () => {
    test("should show title of todos", async () => {
      render(<MockHome />)
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
      mockData.forEach((d) => expect(screen.getByText(d.title)).toBeInTheDocument())
    })
    test("remove todo from list", async () => {
      render(<MockHome />)
      await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
      fireEvent.click(screen.getByTestId("close-btn-2"))
      expect(screen.queryByText(/quis ut nam facilis et officia qui/i)).not.toBeInTheDocument()
    })
  })
})
