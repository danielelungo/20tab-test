import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/home/Home"
import NotFound from "./Pages/notFound/NotFound"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
