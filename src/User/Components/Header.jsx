import { Heart, ShoppingCart } from "react-icons";

 function Header() {
  return (
    <header className="bg-[#003B63] text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Store</h1>
        <div className="hidden md:flex w-[500px]">
          <input type="text" placeholder="Search any things"
           className="w-full px-4 py-2 rounded-l-full text-black outline-none"/>
          <button className="bg-yellow-500 px-8 rounded-r-full"> Search</button>
        </div>

        <div className="flex items-center gap-6">
          <Heart size={20} />
          <button>Sign In</button>
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} />
            <span>Cart</span>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header