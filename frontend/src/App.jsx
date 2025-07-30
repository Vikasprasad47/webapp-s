import { useState } from 'react'
import Header from './components/Header'
import './App.css'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <Header/>
      <main className=""> {/* adjust for sticky header */}
        <Outlet/>
      </main>
    </>
  )
}

export default App
