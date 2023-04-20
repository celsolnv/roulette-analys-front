import { BrowserRouter, Route, Routes } from "react-router-dom";
import Charts from './Charts'
import Selenium from "./Selenium";
import Simulator from "./Simulator";
import Table from './Table'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Charts />} />
        <Route path='/table' element={<Table />} />
        <Route path='/simulation' element={<Simulator />} />
        <Route path='/selenium' element={<Selenium />} />
      </Routes>
    </BrowserRouter>
  )
}