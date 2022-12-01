import { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";

function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    //imgfile
    if (name === "file") {
      setFile(files && files[0]);
      return; //setProduct이 호출되지 않도록 바로 return을 해준다.
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(file).then((url) => {
      console.log(url);
      addNewProduct(product, url);
    });
  };
  return (
    <section>
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="file"
          accept="image/*"
          name="file"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ""}
          placeholder="제품명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ""}
          placeholder="카테고리"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ""}
          placeholder="제품설명"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ""}
          placeholder="옵션 ( , 로 구분)"
          required
          onChange={handleChange}
        />
        <Button text="제품 등록" />
      </form>
    </section>
  );
}
export default NewProduct;
