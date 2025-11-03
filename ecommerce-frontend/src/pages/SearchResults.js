import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/api/search/?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch results");
        return res.json();
      })
      .then((data) => setResults(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  // ✅ Safe number formatting helper
  const formatPrice = (value) => {
    const num = Number(value);
    return isNaN(num) ? value : num.toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md p-4">
        <h7 className="text-2xl font-bold text-gray-800">
          Search Results for:{" "}
          <span className="text-primary">{searchTerm}</span>
        </h7>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow px-8 py-10">
        {loading && <p className="text-center text-gray-500">Loading results...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {!loading && !error && results.length === 0 && (
          <p className="text-center text-gray-500">No products found.</p>
        )}

        {/* ✅ Product Grid (same style as AllProducts) */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {results.map((p) => (
            <div className="col" key={p.pdt_id}>
              <div
                className="card border-0 shadow-sm text-center h-100"
                style={{
                  borderRadius: "15px",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.1)";
                }}
              >
                <div className="card-body">
                  <h5 className="card-title text-primary fw-bold">
                    {p.pdt_name}
                  </h5>
                  <p className="card-text text-muted small mb-1">
                    <strong>MRP:</strong> ₹{formatPrice(p.pdt_mrp)}
                  </p>
                  <p className="card-text text-muted small mb-1">
                    <strong>Discount:</strong> ₹{formatPrice(p.pdt_dis_price)}
                  </p>
                  <p className="card-text text-muted small mb-3">
                    <strong>Qty:</strong> {p.pdt_qty}
                  </p>
                  <Link
                    to={`/product/${p.pdt_id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-3 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Quick Commerce | Search Results
      </footer>
    </div>
  );
}

export default SearchResults;
