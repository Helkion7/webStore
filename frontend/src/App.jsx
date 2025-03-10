import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import Products from "./pages/Products";
import Login from "./pages/login";
import Register from "./pages/register";
import CreateProduct from "./pages/CreateProduct";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="py-6">
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/create" element={<CreateProduct />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/create-product" element={<CreateProduct />} />

          {/* Updated category routes */}
          <Route path="/genser" element={<CategoryPage category="genser" />} />
          <Route
            path="/tskjorte"
            element={<CategoryPage category="tskjorte" />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* 404 route */}
          <Route
            path="*"
            element={
              <h1 className="text-center text-2xl mt-10">404 Not Found</h1>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
