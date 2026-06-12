import React, { useState, useEffect } from "react";
import baseUrl from "../../Services/baseUrl";
import { getWishlistApi, deleteWishlistApi } from "../../Services/allApis";
import {
  FaHeart,
  FaSearch,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header({
  searchTerm,
  setSearchTerm,
  wishlist = [],
  setWishlist,
  user,
  setUser,
}) {
  const navigate = useNavigate();

  const [showWishlist, setShowWishlist] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      getWishlist();
    }
  }, []);

  //wishlists display
  const getWishlist = async () => {
    const result = await getWishlistApi();
    if (result.status === 200) {
      setWishlist(result.data);
    }
  }

  const handleRemove = async (pid) => {
    const result = await deleteWishlistApi(pid);
    if (result.status === 200) {
      setWishlist(wishlist.filter((item) => item._id !== pid));
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    toast.error('Logged Out')

    if (setUser) {
      setUser(null);
    }

    navigate("/auth");
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-[#003B5C] min-h-[5rem] py-4 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-center relative px-4 gap-4 md:gap-0">

        {/* SEARCH BAR */}
        <div className="flex w-full max-w-xl order-2 md:order-none">

          <div className="flex items-center bg-white rounded-l-full px-4 w-full">
            <FaSearch className="text-gray-400 mr-2" />

            <input
              type="text"
              placeholder="Search any things"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 outline-none text-sm"
            />
          </div>

          <button className="bg-[#F5A623] hover:bg-[#e29516] text-white px-6 md:px-8 rounded-r-full font-medium transition">
            Search
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex md:absolute right-4 md:right-8 items-center justify-end w-full md:w-auto gap-4 md:gap-6 text-white order-1 md:order-none">

          {/* WISHLIST */}
          <button
            onClick={() => setShowWishlist(true)}
            className="relative hover:scale-110 transition"
          >
            <FaHeart size={18} />

            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#F5A623] text-white text-xs h-5 w-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* USER */}
          {!user ? (
            <Link
              to="/auth"
              className="text-sm hover:text-[#F5A623] transition"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex items-center gap-4">

              <span className="text-sm font-medium">
                Hi, Welcome {user?.name}
              </span>

              <button
                onClick={handleLogout}
                className="bg-[#F5A623] hover:bg-[#e29516] px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>

            </div>

          )}
        </div>
      </header>

      {/* WISHLIST OFFCANVAS */}
      {showWishlist && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowWishlist(false)}
          ></div>

          <div className="fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-xl overflow-y-auto">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-lg">
                Wishlist
              </h2>

              <button
                onClick={() => setShowWishlist(false)}
                className="text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-4">

              {wishlist.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">
                  No products in wishlist
                </p>
              ) : (
                wishlist.map((item) => (
                  <div
                    key={item._id}
                    className="border rounded-lg p-3 mb-3"
                  >
                    <img
                      src={`${baseUrl}/uploads/${item.image}`}
                      alt={item.productName}
                      className="w-full h-32 object-contain"
                    />

                    <h3 className="font-medium mt-2">
                      {item.productName}
                    </h3>

                    <p className="text-sm text-gray-600">
                      ₹{item?.variants?.[0]?.price}
                    </p>

                    <button
                      onClick={() =>
                        handleRemove(item._id)
                      }
                      className="mt-3 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}

            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;