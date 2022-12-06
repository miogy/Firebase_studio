import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { removeFromCart } from "../api/firebase";

function CartItem({ product, uid, product: { id, image, title, options } }) {
  const handleDelete = () => removeFromCart(uid, id);
  return (
    <li className="my-2 items-center rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105">
      <div>
        <img src={image} alt={title} />

        <div className="mt-2 p-4 text-lg flex justify-between items-center">
          <h3 className="truncate font-semibold mr-10 w-1/2">{title}</h3>
          <p className="mb-2 px-2 text-gray-500">{options}</p>
          <RiDeleteBin5Fill onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
