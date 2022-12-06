import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  product,
  product: { id, image, title, category, description },
}) {
  const navigate = useNavigate();
  return (
    <li
      onClick={() => {
        navigate(`/products/${id}`, { state: { product } });
      }}
      className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105"
    >
      <img className="w-full" src={image} alt={title} />

      <div className="mt-2 md:px-3 px-6 text-lg flex justify-between items-center ">
        <h3 className="truncate font-semibold mr-10 w-1/2">{title}</h3>
        <p>
          <strong className=" font-light text-gray-700 ">Brand</strong>
          <span className="block text-sm ">{description}</span>
        </p>
      </div>
      <p className="mb-2 px-2 text-gray-500">{category}</p>
    </li>
  );
}

export default ProductCard;
