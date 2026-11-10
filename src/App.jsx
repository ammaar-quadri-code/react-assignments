import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import HomeRealEstate from './pages/HomeRealEstate';
import CredentialsTable from './pages/CredentialsTable';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import UseRefDemo from './pages/UseRefDemo';
import StateComparison from './pages/StateComparison';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#080811] text-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Question 1: Real estate website */}
              <Route path="/" element={<HomeRealEstate />} />

              {/* Assignment 2: 5-credential input form, logging, dynamic table */}
              <Route path="/credentials" element={<CredentialsTable />} />

              {/* Tajamul Ali Sir Assignment: 10/page products, filter, search, next/prev */}
              <Route path="/products" element={<Products />} />

              {/* Dynamic route for single product */}
              <Route path="/product/:id" element={<ProductDetail />} />

              {/* Question 3: useRef example */}
              <Route path="/use-ref" element={<UseRefDemo />} />

              {/* Question 4: useContext vs Zustand */}
              <Route path="/state-management" element={<StateComparison />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}