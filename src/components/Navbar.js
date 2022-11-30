import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { login, logout, onUserStateChange } from "../api/firebase";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      setUser(user);
    });
  }, []);

  const handleLogin = () => {
    login().then(setUser); //firebase의 login()호출
  };
  const handleLogout = () => {
    logout().then(setUser); //firebase의 logout()호출
  };
  return (
    <header className="flex justify-between border-b border-gray-300 p-2">
      <Link to="/" className="flex items-center text-4xl text-brand">
        <FiShoppingBag /> <h1>MIOGY STUDIO</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold">
        <Link to="/products">Products</Link>
        <Link to="/cart">Carts</Link>
        <Link to="/products/new">New</Link>
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
}
export default Navbar;
