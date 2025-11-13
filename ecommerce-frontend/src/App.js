import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Welcome from "./pages/Welcome";
import CategoryPage from "./pages/CategoryPage";
import CategoryProducts from "./pages/CategoryProducts";
import AllProducts from "./pages/AllProducts";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // add loader until token verified
  const navigate = useNavigate();

  // 🔹 Verify token with backend
  const verifyToken = async (token) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/verify_token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        return data.user_id;
      } else {
        console.warn("Token invalid:", data.error);
        return null;
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      return null;
    }
  };

  // 🔹 Restore and validate user session on app load
  useEffect(() => {
    const initAuth = async () => {
      const isAuth = localStorage.getItem("isAuthenticated") === "true";
      const storedUser = localStorage.getItem("authUser");
      const token = localStorage.getItem("access_token");

      if (isAuth && storedUser && token) {
        const validUserId = await verifyToken(token);
        if (validUserId) {
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
          } catch (err) {
            console.error("Failed to parse authUser:", err);
          }
        } else {
          // Token invalid -> logout user
          localStorage.clear();
          setUser(null);
          navigate("/signin");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, [navigate]);

  // 🔹 Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSearchTerm("");
  };

  if (loading) {
    return <div className="text-center mt-5">Checking session...</div>;
  }

  const isAuthenticated = !!user;

  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      <div className="container mt-3">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={isAuthenticated ? <Home /> : <Welcome />} />
          <Route path="/signin" element={<SignIn onAuth={setUser} />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/category/:id"
            element={
              isAuthenticated ? <CategoryProducts /> : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/e-commerce/category/:ct_id"
            element={
              isAuthenticated ? <CategoryPage /> : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/all-products"
            element={
              isAuthenticated ? <AllProducts /> : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/search"
            element={
              isAuthenticated ? <SearchResults /> : <Navigate to="/signin" replace />
            }
          />

          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;

