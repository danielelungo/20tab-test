import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import renderer from "react-test-renderer"
import NotFound from "../NotFound"

const MockNotFound = () => {
  return (
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  )
}

describe("NotFound component", () => {
  test("rmatch NotFound SnapShot", () => {
    const tree = renderer.create(<MockNotFound />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  test("Should render header", () => {
    render(<MockNotFound />)
    const headingElement = screen.getByRole("heading", { name: "404: Page Non Found" })
    expect(headingElement).toBeInTheDocument()
  })
})
