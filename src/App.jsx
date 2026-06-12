import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Authentication from './User/Pages/Authentication'
import Home from './User/Pages/Home'
import ProductDetail from './User/Pages/ProductDetail'

function App() {
  return (
    <div>
      <Routes>
       <Route path='/auth' element={<Authentication />} />
       <Route path='/' element={<Home />} />
       <Route path='/product/:pid' element={<ProductDetail />} />
      </Routes>
    </div>
  )
}

export default App 