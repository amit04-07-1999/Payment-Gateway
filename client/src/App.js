import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Payement from './pages/Payement'

const App = () => {
  return (
    <>
      <Router >
        <Routes >
          <Route path='/' element={<Payement />}></Route>

        </Routes>
      </Router>

    </>
  )
}

export default App