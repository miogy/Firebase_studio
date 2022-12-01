import { useState } from "react";
import { addNewProduct } from "../api/firebase";
import { uploadImage } from "../api/uploader";
import Button from "../components/ui/Button";

function NewProduct() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
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
    setIsUploading(true);
    uploadImage(file)
      .then((url) => {
        console.log(url);
        addNewProduct(product, url).then(() => {
          setSuccess("등록 성공!");
          setTimeout(() => {
            setSuccess(null);
          }, 3000);
        });
      })
      .finally(() => setIsUploading(false));
  };
  return (
    <section className="max-w-md text-center mx-auto my-auto mt-6">
      <h2 className="w-full text-2xl font-bold my-8">New Item</h2>
      {success && <p className="my-2">👏{success}</p>}
      {file && (
        <img
          className="w-96 mx-auto my-8"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form onSubmit={handleSubmit} className="flex flex-col px-12">
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
        <Button
          className="mt-8"
          text={isUploading ? "업로드중.." : "제품 등록"}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
export default NewProduct;
