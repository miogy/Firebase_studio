import { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/ui/Button";

function ProductDetail() {
  const {
    state: {
      product: { id, image, title, description, category, options },
    },
  } = useLocation();
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);
  const handleClick = () => {};
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
