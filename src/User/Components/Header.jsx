import React, { useState } from "react";
import {
  FaHeart,
  FaUserCircle,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Header({
  searchTerm,
  setSearchTerm,
  wishlist = [],
  user,
  setUser,
}) {
  const navigate = useNavigate();

  const [showWishlist, setShowWishlist] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (setUser) {
      setUser(null);
    }

    navigate("/auth");
  };

  return (
    <>
      {/* HEADER */}
      <header className="bg-[#003B5C] h-20 flex items-center justify-center relative px-4">

        {/* SEARCH BAR */}
        <div className="flex w-full max-w-xl">

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

          <button className="bg-[#F5A623] hover:bg-[#e29516] text-white px-8 rounded-r-full font-medium transition">
            Search
          </button>
        </div>

        {/* RIGHT SECTION */}
        <div className="absolute right-8 flex items-center gap-6 text-white">

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
            <div className="relative">

              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2"
              >
                <FaUserCircle size={28} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-lg text-black z-50">

                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">
                      {user?.name || "User"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>

                </div>
              )}
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
                      src={item.image}
                      alt={item.productName}
                      className="w-full h-32 object-contain"
                    />

                    <h3 className="font-medium mt-2">
                      {item.productName}
                    </h3>

                    <p className="text-sm text-gray-600">
                      ₹{item.price}
                    </p>
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