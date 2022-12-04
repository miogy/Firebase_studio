import { useState } from "react";
import { useLocation } from "react-router-dom";
import { addOrUpdateToCart } from "../api/firebase";
import Button from "../components/ui/Button";
import { useAuthContext } from "../context/AuthContext";

function ProductDetail() {
  const { uid } = useAuthContext();
  //AuthContext에 uid: user && user.uid도 추가로 보내줌
  const {
    state: {
      product: { id, image, title, description, category, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = (e) => {
    const product = { id, image, title, options: selected, quantity: 1 };
    //quantity:1 수량 1
    addOrUpdateToCart(uid, product);
  };
  return (
    <section className="pt-20">
      <p className="mx-12 mt-4 text-gray-600">{category}</p>
      <div className="flex flex-col md:flex-row p-4">
        <img className="w-full basis-6/12 px-10" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="border-b border-gray-200 py-6 text-2xl font-light ">
            {description}
          </p>
          <div className="flex items-center">
            <label htmlFor="select" className="py-4 text-lg mr-6">
              color :
            </label>
            <select
              className="p-2 flex-1 border border-gray-300 outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((op, index) => <option key={index}>{op}</option>)}
            </select>
          </div>
          <Button text="cart" onClick={handleClick} />
        </div>
      </div>
    </section>
  );
}
export default ProductDetail;
