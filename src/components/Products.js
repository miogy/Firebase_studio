import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/firebase";
import ProductCard from "./ProductCard";

function Products() {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], () => getProducts());
  return (
    <div className="pt-20">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-1 md:grid-cols-4 lg-grid-cols-6 gap-4 p-4">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </div>
  );
}

export default Products;
