import { Link } from "react-router-dom";
import { FiShoppingBag, FiMenu } from "react-icons/fi";
import { AiFillFolderAdd } from "react-icons/ai";
import User from "./User";
import Button from "./ui/Button";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import WishStatus from "./WishStatus";

function Navbar() {
  const { user, login, logout } = useAuthContext();
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <header className="fixed bg-white w-full flex justify-between border-b border-gray-300 p-2 m-0 max-w-screen-2xl z-10 te ">
      <Link
        to="/"
        className="flex items-center text-4xl tracking-[-.13em] font-light "
      >
        <FiShoppingBag /> <h1>MIOGY STUDIO</h1>
      </Link>
      <nav className="flex items-center gap-4 font-semibold hidden md:flex">
        <Link to="/products">Products</Link>
        {user && (
          <Link to="/carts">
            <WishStatus />
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/products/new">
            <AiFillFolderAdd className="text-4xl" />
          </Link>
        )}

        {user && <User user={user} />}
        {!user && <Button text="Login" onClick={login}></Button>}
        {user && <Button text="Logout" onClick={logout}></Button>}
      </nav>
      <div className="md:hidden flex flex-col relative">
        <button onClick={handleMenu}>
          <FiMenu
            style={{ fontSize: "28px", display: "flex", alignItems: "center" }}
          />
        </button>
        {menu && (
          <div className="absolute top-12 right-1 flex flex-col items-center font-semibold bg-white p-5 opacity-90">
            <Link to="/products">Products</Link>
            {user && <Link to="/carts">Carts</Link>}
            {user && user.isAdmin && <Link to="/products/new">New</Link>}

            {user && <User user={user} className="mb-8" />}
            {!user && <Button text="Login" onClick={login}></Button>}
            {user && <Button text="Logout" onClick={logout}></Button>}
          </div>
        )}
      </div>
    </header>
  );
}
export default Navbar;
