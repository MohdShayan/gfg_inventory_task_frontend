import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from './src/App'
import Login from './src/Login'
import Signup from './src/Signup'
import AdminPage from './src/AdminPage' 
import ProductList from './src/Products'
import AdminRoute from './AdminRoute'

const AllRoutes = () => {
  return (
  
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="/products" element={<ProductList />} />

  
      </Routes>

  )
}

export default AllRoutes
