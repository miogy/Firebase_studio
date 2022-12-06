import { useQuery } from "@tanstack/react-query";
import { getCart } from "../api/firebase";
import WishItem from "../components/WishItem";
import { useAuthContext } from "../context/AuthContext";

function MyCart() {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(["carts"], () => getCart(uid));
  const total =
    products &&
    products.reduce(
      (prev, current) => prev + parseInt(current.quantity) * current.quantity,
      0
    );

  if (isLoading) return <p>Loading...</p>;
  const hasProducts = products && products.length > 0;
  return (
    <section>
      {!hasProducts && <p>리스트에 상품이 없습니다.</p>}
      {hasProducts && (
        <div className="pt-20 ">
          <div>총 관심 Pattern이 {total}개가 있습니다.</div>
          <ul className="grid grid-cols-1 md:grid-cols-4 lg-grid-cols-6 gap-4 p-4">
            {products &&
              products.map((product) => (
                <WishItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div></div>
        </div>
      )}
    </section>
  );
}
export default MyCart;
