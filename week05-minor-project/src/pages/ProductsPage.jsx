import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setSelectedCategory, setSortBy } from '../store/productSlice';
import ProductCard from '../components/ProductCard';

function ProductsPage() {
  const dispatch = useDispatch();
  const { items, loading, error, searchQuery, selectedCategory, sortBy } = useSelector(
    (state) => state.products
  );

  // Pagination state (Bonus Feature)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Unique categories list
  const categories = ['All', ...new Set(items.map((item) => item.category))];

  // 1. Filter by search & category
  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // 2. Sort by price
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price;
    if (sortBy === 'high-to-low') return b.price - a.price;
    return 0;
  });

  // 3. Pagination calculation
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const handleCategoryChange = (cat) => {
    dispatch(setSelectedCategory(cat));
    setCurrentPage(1);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">All Products</h1>

      {/* Filter & Sort Controls */}
      <div className="controls-bar">
        <input
          type="text"
          placeholder="Search product name..."
          value={searchQuery}
          onChange={(e) => {
            dispatch(setSearchQuery(e.target.value));
            setCurrentPage(1);
          }}
          className="filter-input"
        />

        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="filter-select"
        >
          <option value="default">Sort by: Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {loading && <div className="status-msg">Loading products...</div>}
      {error && <div className="status-msg error">Error: {error}</div>}

      {!loading && !error && paginatedProducts.length === 0 && (
        <div className="status-msg">No products matched your search or filter.</div>
      )}

      {!loading && !error && paginatedProducts.length > 0 && (
        <>
          <div className="products-grid">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-secondary btn-sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="btn btn-secondary btn-sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductsPage;
