
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import {
  FaHeart,
  FaMinus,
  FaPlus,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [selectedVariant, setSelectedVariant] =
    useState(null);

  const [quantity, setQuantity] = useState(1);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [editData, setEditData] = useState({
    productName: "",
    description: "",
    subCategoryId: "",
  });

  // ---------------------
  // API CALL
  // ---------------------

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    // API CALL

    const dummy = {
      _id: 1,
      productName: "HP AMD Ryzen 3",
      description:
        "The Ryzen processor delivers excellent performance.",
      image:
        "https://pngimg.com/d/laptop_PNG5939.png",
      variants: [
        {
          ram: "4 GB",
          price: 52999,
          qty: 10,
        },
        {
          ram: "8 GB",
          price: 62999,
          qty: 8,
        },
        {
          ram: "16 GB",
          price: 72999,
          qty: 5,
        },
      ],
    };

    setProduct(dummy);

    setSelectedVariant(dummy.variants[0]);

    setEditData({
      productName: dummy.productName,
      description: dummy.description,
    });
  };

  if (!product) {
    return (
      <div className="text-center mt-20">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <Header />

      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* Breadcrumb */}

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
          <span>Home</span>
          <span>{">"}</span>
          <span>Product Details</span>
        </div>

        {/* Content */}

        <div className="grid grid-cols-2 gap-10">

          {/* LEFT */}

          <div>

            <div className="border rounded-2xl h-[420px] flex justify-center items-center">

              <img
                src={product.image}
                alt=""
                className="w-[300px]"
              />

            </div>

            {/* Thumbnails */}

            <div className="flex gap-4 mt-5">

              <div className="border rounded-xl p-3">
                <img
                  src={product.image}
                  alt=""
                  className="w-24"
                />
              </div>

              <div className="border rounded-xl p-3">
                <img
                  src={product.image}
                  alt=""
                  className="w-24"
                />
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <h1 className="text-4xl font-semibold text-[#003B5C]">
              {product.productName}
            </h1>

            <h2 className="text-3xl font-bold mt-4">
              ₹{selectedVariant?.price}
            </h2>

            {/* Stock */}

            <div className="flex items-center gap-2 mt-4">

              <span>Availability:</span>

              <FaCheck className="text-green-500" />

              <span className="text-green-500">
                In stock
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              Hurry up! only few products left
            </p>

            <hr className="my-8" />

            {/* Variants */}

            <div>

              <h3 className="mb-3 font-medium">
                Ram:
              </h3>

              <div className="flex gap-3">

                {product.variants.map(
                  (variant, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedVariant(
                          variant
                        )
                      }
                      className={`px-4 py-2 border rounded
                      ${
                        selectedVariant?.ram ===
                        variant.ram
                          ? "bg-[#F5A623] text-white"
                          : ""
                      }`}
                    >
                      {variant.ram}
                    </button>
                  )
                )}

              </div>

            </div>

            {/* Quantity */}

            <div className="flex items-center gap-4 mt-8">

              <span>Quantity :</span>

              <div className="flex border rounded">

                <button
                  onClick={() =>
                    quantity > 1 &&
                    setQuantity(
                      quantity - 1
                    )
                  }
                  className="px-3 py-2"
                >
                  <FaMinus />
                </button>

                <span className="px-5 py-2">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(
                      quantity + 1
                    )
                  }
                  className="px-3 py-2"
                >
                  <FaPlus />
                </button>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex gap-5 mt-10">

              <button
                onClick={() =>
                  setShowEditModal(true)
                }
                className="bg-[#F5A623] text-white px-8 py-3 rounded-full"
              >
                Edit Product
              </button>

              <button
                className="bg-[#F5A623] text-white px-8 py-3 rounded-full"
              >
                Buy it now
              </button>

              <button className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <FaHeart />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* EDIT PRODUCT MODAL */}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white w-[700px] rounded-xl p-8">

            <div className="flex justify-between mb-6">

              <h2 className="text-2xl font-semibold">
                Edit Product
              </h2>

              <FaTimes
                onClick={() =>
                  setShowEditModal(false)
                }
                className="cursor-pointer"
              />

            </div>

            <input
              type="text"
              value={editData.productName}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  productName:
                    e.target.value,
                })
              }
              className="border p-3 rounded-lg w-full mb-4"
            />

            <textarea
              rows="4"
              value={editData.description}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  description:
                    e.target.value,
                })
              }
              className="border p-3 rounded-lg w-full"
            />

            <div className="flex justify-end mt-6">

              <button
                className="bg-[#F5A623] text-white px-6 py-3 rounded-lg"
              >
                Update Product
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ProductDetail;