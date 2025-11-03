import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user, setUser, searchTerm, setSearchTerm, onSearch }) {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");

    if (storedUser && !user) {
      try {
        const parsed =
          storedUser.trim().startsWith("{") && storedUser.trim().endsWith("}")
            ? JSON.parse(storedUser)
            : { email: storedUser };
        setUser(parsed);
      } catch (err) {
        console.error("Failed to parse authUser:", err);
        setUser({ email: storedUser });
      }
    }
  }, [user, setUser]);

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("authUser");
    setUser(null);
    navigate("/signin");
  };

  return (
    <nav className="navbar navbar-light bg-light px-3 shadow-sm d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
        <Link to="/" className="navbar-brand fw-bold text-primary me-3">
          Q-Commerce
        </Link>

        {user && (
          <>
            <Link
              to="/all-products"
              className="btn btn-outline-secondary btn-sm me-3 rounded-3"
            >
              View All Products
            </Link>

            <div className="input-group input-group-sm" style={{ width: "240px" }}>
              <input
                type="text"
                className="form-control form-control-sm rounded-2"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
              <button className="btn btn-primary ms-1 rounded-3" onClick={onSearch}>
                Search
              </button>
            </div>
          </>
        )}
      </div>

      <div className="d-flex align-items-center">
        {user ? (
          <>
            <span className="me-3 text-muted">
              Hi, {user?.email || "User"}
            </span>
            <button className="btn btn-outline-danger btn-sm rounded-4" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin" className="btn btn-outline-success btn-sm mx-1">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-outline-primary btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
