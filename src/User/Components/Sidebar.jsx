import React, { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";

function Sidebar({
  categories = [],
  subCategories = [],
  selectedSubCategory,
  setSelectedSubCategory,
}) {
  const [openCategory, setOpenCategory] =
    useState(null);

  const handleCategoryToggle = (id) => {
    setOpenCategory(
      openCategory === id ? null : id
    );
  };

  return (
    <div className="w-full">

      {/* Heading */}

      <h2 className="text-[#003B5C] font-semibold text-lg mb-4">
        Categories
      </h2>

      {/* All Categories */}

      <button
        onClick={() =>
          setSelectedSubCategory("")
        }
        className="text-gray-700 text-sm mb-5 block hover:text-[#F5A623] transition"
      >
        All Categories
      </button>

      {/* Categories */}

      <div className="space-y-4">

        {categories?.map((category) => {

          const categorySubs =
            subCategories?.filter(
              (sub) =>
                sub.categoryId ===
                  category._id ||
                sub.categoryId?._id ===
                  category._id
            );

          return (
            <div key={category._id}>

              {/* Category Header */}

              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() =>
                  handleCategoryToggle(
                    category._id
                  )
                }
              >
                <span className="text-gray-700 font-medium">
                  {category.categoryName}
                </span>

                {categorySubs?.length >
                  0 &&
                  (openCategory ===
                  category._id ? (
                    <FaChevronDown
                      size={12}
                      className="text-gray-500"
                    />
                  ) : (
                    <FaChevronRight
                      size={12}
                      className="text-gray-500"
                    />
                  ))}
              </div>

              {/* Sub Categories */}

              {openCategory ===
                category._id &&
                categorySubs?.length >
                  0 && (
                  <div className="mt-3 ml-2 space-y-3">

                    {categorySubs.map(
                      (sub) => (
                        <label
                          key={sub._id}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="subcategory"
                            checked={
                              selectedSubCategory ===
                              sub._id
                            }
                            onChange={() =>
                              setSelectedSubCategory(
                                sub._id
                              )
                            }
                            className="accent-[#F5A623]"
                          />

                          <span className="text-sm text-gray-500 hover:text-[#F5A623] transition">
                            {
                              sub.subCategoryName
                            }
                          </span>

                        </label>
                      )
                    )}

                  </div>
                )}

            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Sidebar;