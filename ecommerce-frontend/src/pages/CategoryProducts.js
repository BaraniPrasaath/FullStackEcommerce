import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/?ct_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && Array.isArray(data.results)) {
          setProducts(data.results);
        } else if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [id]);

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);

return (
  <div className="container py-5 text-center">
    <h1 className="fw-bold mb-5">Products</h1>

    {/* Product grid layout */}
    <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
      {currentProducts.map((p) => (
        <div className="col" key={p.pdt_id}>
          <div
            className="card border-0 shadow-sm h-100"
            style={{
              borderRadius: "15px",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <div className="card-body text-center">
              <h5 className="card-title text-primary fw-bold">{p.pdt_name}</h5>
              <p className="card-text text-muted small mb-1">
                <strong>MRP:</strong> ₹{p.pdt_mrp}
              </p>
              <p className="card-text text-success small mb-1">
                <strong>Discount:</strong> ₹{p.pdt_dis_price}
              </p>
              <p className="card-text text-secondary small">
                <strong>Qty:</strong> {p.pdt_qty}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pagination buttons */}
    {/* PAGINATION */}
    {products.length > productsPerPage && (
      <div className="d-flex justify-content-center align-items-center mt-4 flex-wrap gap-2">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        })
          .map((_, i) => i + 1)
          .filter(
            (page) =>
              page === 1 ||
              page === Math.ceil(products.length / productsPerPage) ||
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
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(products.length / productsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Next
        </button>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => setCurrentPage(Math.ceil(products.length / productsPerPage))}
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
        >
          Last
        </button>
  </div>
)}

  </div>
);

};

export default CategoryProducts;
