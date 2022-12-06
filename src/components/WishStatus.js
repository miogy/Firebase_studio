import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaUser } from "react-icons/fa";
import { getCart } from "../api/firebase";
import { useAuthContext } from "../context/AuthContext";

function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(["carts"], () => getCart(uid));
  return (
    <div className="relative">
      <FaUser className="text-2xl" />
      {products && (
        <p className="w-5 h-5 bg-gray-300 text-white font-bold rounded-full absolute -top-1 -right-2 text-s flex justify-center items-center">
          {products.length}
        </p>
      )}
    </div>
  );
}

export default CartStatus;
