import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListEmployeeComponents from './Component/ListEmployeeComponents'
import HeaderComponent from './Component/HeaderComponent'
import FooterComponent from './Component/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeComponent from './Component/EmployeeComponent'

import { ThemeProvider } from './context/ThemeContext'
import DashboardComponent from './Component/DashboardComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <div className="app-container">
            <HeaderComponent />
            <div className="main-content container mt-5 pt-4"> {/* Added top margin/padding for fixed header */}
              <Routes>
                {/* // http://localhost:3000 */}
                <Route path='/' element={<DashboardComponent />}></Route>

                {/* // http://localhost:3000/employees */}
                <Route path='/employees' element={<ListEmployeeComponents />}></Route>

                {/* //http://localhost:3000/add-employee */}
                <Route path='/add-employee' element={<EmployeeComponent />}></Route>

                {/* //http://localhost:3000/update-employee/1 */}
                <Route path='/update-employee/:id' element={<EmployeeComponent />}></Route>

              </Routes>
            </div>
            <FooterComponent />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
