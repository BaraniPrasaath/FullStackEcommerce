//Checkpoint 1: Django backend initialized, project structure created.

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // ✅ Restore user info on app load
  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";
    const storedUser = localStorage.getItem("authUser");

    if (isAuth && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Failed to parse authUser:", err);
      }
    }
  }, []);

  // ✅ Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
    setSearchTerm("");
  };

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
          <Route path="/" element={user ? <Home /> : <Welcome />} />
          <Route path="/signin" element={<SignIn onAuth={setUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/category/:id" element={<CategoryProducts />} />
          <Route path="/e-commerce/category/:ct_id" element={<CategoryPage />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </>
  );
}

export default App;










// import React, { useEffect, useState } from "react";
// import { Routes, Route, useNavigate } from "react-router-dom";

// import SignIn from "./pages/SignIn";
// import SignUp from "./pages/SignUp";
// import Home from "./pages/Home";
// import Welcome from "./pages/Welcome";
// import CategoryPage from "./pages/CategoryPage";
// import CategoryProducts from "./pages/CategoryProducts";
// import AllProducts from "./pages/AllProducts";
// import Navbar from "./components/Navbar";
// import SearchResults from "./pages/SearchResults";


// function App() {
// const [user, setUser] = useState(null);
// const [searchTerm, setSearchTerm] = useState("");
// const navigate = useNavigate();

// useEffect(() => {
// const isAuth = localStorage.getItem("isAuthenticated") === "true";
// const username = localStorage.getItem("authUser");
// if (isAuth && username) setUser({ username });
// }, []);

// const handleSearch = () => {
// if (!searchTerm.trim()) return;
// console.log("Searching for:", searchTerm);
// navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
// };

// return (
// <>
// <Navbar user={user} setUser={setUser} searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
//   <div className="container mt-3">
//     <Routes>
//       <Route path="/" element={user ? <Home /> : <Welcome />} />
//       <Route path="/signin" element={<SignIn onAuth={(u) => setUser(u)} />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/category/:id" element={<CategoryProducts />} />
//       <Route path="/e-commerce/category/:ct_id" element={<CategoryPage />} />
//       <Route path="/all-products" element={<AllProducts />} />
//       <Route path="/search" element={<SearchResults />} />
//     </Routes>
//   </div>
// </>
// );
// }
// export default App;















// // // App.js
// // import React, { useEffect, useState } from "react";
// // import { Routes, Route, Link, useNavigate } from "react-router-dom";

// // import SignIn from "./pages/SignIn";
// // import SignUp from "./pages/SignUp";
// // import Home from "./pages/Home";
// // import Welcome from "./pages/Welcome";
// // import CategoryPage from "./pages/CategoryPage";
// // import CategoryProducts from "./pages/CategoryProducts";
// // import AllProducts from "./pages/AllProducts";

// // function App() {
// //   const [user, setUser] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const navigate = useNavigate();

// //   // Check authentication
// //   useEffect(() => {
// //     const isAuth = localStorage.getItem("isAuthenticated") === "true";
// //     const username = localStorage.getItem("authUser");
// //     if (isAuth && username) setUser({ username });
// //   }, []);

// //   const logout = () => {
// //     localStorage.removeItem("isAuthenticated");
// //     localStorage.removeItem("authUser");
// //     setUser(null);
// //     navigate("/");
// //   };

// //   const handleSearch = () => {
// //     console.log("Searching for:", searchTerm);
// //     // Example: navigate(`/search?query=${searchTerm}`)
// //   };

// //   return (
// //     <>
// //       {/* Navbar */}
// //       <nav className="navbar navbar-light bg-light px-3 shadow-sm d-flex justify-content-between align-items-center">
// //         {/* LEFT SIDE */}
// //         <div className="d-flex align-items-center">
// //           <Link to="/" className="navbar-brand fw-bold text-primary me-3">
// //             Q-Commerce
// //           </Link>

// //           {user && (
// //             <>
// //               <Link
// //                 to="/all-products"
// //                 className="btn btn-outline-secondary btn-sm me-3"
// //               >
// //                 View All Products
// //               </Link>

// //               <div className="input-group input-group-sm" style={{ width: "240px" }}>
// //                 <input
// //                   type="text"
// //                   className="form-control form-control-sm"
// //                   placeholder="Search..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handleSearch()}
// //                 />
// //                 <button className="btn btn-primary" onClick={handleSearch}>
// //                   Search
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //         </div>

// //         {/* RIGHT SIDE */}
// //         <div className="d-flex align-items-center">
// //           {user ? (
// //             <>
// //               <span className="me-3 text-muted">Hi, {user.username}</span>
// //               <button
// //                 className="btn btn-outline-danger btn-sm"
// //                 onClick={logout}
// //               >
// //                 Logout
// //               </button>
// //             </>
// //           ) : (
// //             <>
// //               <Link to="/signin" className="btn btn-outline-success btn-sm mx-1">
// //                 Sign In
// //               </Link>
// //               <Link to="/signup" className="btn btn-outline-primary btn-sm">
// //                 Sign Up
// //               </Link>
// //             </>
// //           )}
// //         </div>
// //       </nav>

// //       {/* ROUTES */}
// //       <div className="container mt-3">
// //         <Routes>
// //           <Route path="/" element={user ? <Home /> : <Welcome />} />
// //           <Route path="/signin" element={<SignIn onAuth={(u) => setUser(u)} />} />
// //           <Route path="/signup" element={<SignUp />} />
// //           <Route path="/category/:id" element={<CategoryProducts />} />
// //           <Route path="/e-commerce/category/:ct_id" element={<CategoryPage />} />
// //           <Route path="/all-products" element={<AllProducts />} />
// //         </Routes>
// //       </div>
// //     </>
// //   );
// // }

// // export default App;
