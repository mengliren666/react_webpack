import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MyRouter from './route/index.jsx'
function App () {
  return (
      <BrowserRouter>
        <MyRouter />
      </BrowserRouter>
  )
}

export default App
