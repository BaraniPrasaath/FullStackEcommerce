//Checkpoint 5: Implemented Product viewing for All Categories.

import React, { useEffect, useState } from "react";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // ✅ show 5 per page

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => {
        const results = data.results || data;
        setProducts(Array.isArray(results) ? results : []);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const goToFirst = () => setCurrentPage(1);
  const goToLast = () => setCurrentPage(totalPages);
  const goToPrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // ✅ Safe number formatting helper
  const formatPrice = (value) => {
    const num = Number(value);
    return isNaN(num) ? value : num.toFixed(2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md p-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">All Products</h1>
      </header>

      {/* MAIN */}
      <main className="flex-grow px-8 py-10">
        {/* Product Grid */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 justify-content-center">
          {currentProducts.map((p) => (
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
                  <p className="card-text text-muted small mb-1">
                    <strong>Qty:</strong> {p.pdt_qty}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {currentProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-5">
              No products available.
            </p>
          )}
        </div>

        {/* PAGINATION */}
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={goToFirst}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={goToPrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Show limited range of pages */}
            {Array.from({ length: totalPages })
              .map((_, i) => i + 1)
              .filter(
                (page) =>
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
              )
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                const showDots = prevPage && page - prevPage > 1;
                return (
                  <React.Fragment key={page}>
                    {showDots && <span className="mx-1 text-muted">...</span>}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`btn btn-sm ${
                        currentPage === page
                          ? "btn-primary text-white"
                          : "btn-outline-primary"
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              className="btn btn-outline-primary btn-sm"
              onClick={goToNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={goToLast}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-100 text-center py-3 text-sm text-gray-500 border-t">
        © {new Date().getFullYear()} Quick Commerce | All Products
      </footer>
    </div>
  );
}

export default AllProducts;
