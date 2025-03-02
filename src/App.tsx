import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TrackerHome from "./components/TrackerHome.tsx"
import Layout from "./components/Layout.tsx"
import AddExpense from './components/AddExpense.tsx'
import History from './components/History.tsx'
import Admin from './components/Admin.tsx'
import SubmitExpense from './components/SubmitExpense.tsx'
import Error from './components/Error.tsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<TrackerHome />} />
            <Route path="addexpense" element={<AddExpense />} />
            <Route path="history" element={<History />} />
            <Route path="admin" element={<Admin />} />
            <Route path="submitexpense" element={<SubmitExpense />} />
            <Route path="error" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
