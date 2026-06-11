import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

function Sidebar({
  categories,
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
        className="text-gray-700 text-sm mb-5 block hover:text-[#F5A623]"
      >
        All categories
      </button>

      {/* Categories */}

      <div className="space-y-4">

        {categories?.map((category) => (
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
                {category.name}
              </span>

              {category.subCategories
                ?.length > 0 &&
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
              category.subCategories
                ?.length > 0 && (
                <div className="mt-3 ml-2 space-y-3">

                  {category.subCategories.map(
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
                          className="accent-gray-700"
                        />

                        <span className="text-sm text-gray-500">
                          {sub.name}
                        </span>
                      </label>
                    )
                  )}

                </div>
              )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;