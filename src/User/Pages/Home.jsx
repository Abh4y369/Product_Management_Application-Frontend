import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import { FaHeart, FaRegHeart, FaStar, FaTimes, FaPlus, } from "react-icons/fa";
import {
  getAllCategoriesApi, getAllProductsApi, getAllSubCategoriesApi,
  addCategoryApi, addProductApi, addSubCategoryApi,
  addWishlistApi, getWishlistApi
} from "../../Services/allApis";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../Services/baseUrl";
import { toast } from "react-toastify";

function Home() {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [user, setUser] = useState(null);                           //user
  const [categoryName, setCategoryName] = useState("");             //category
  const [subCategoryName, setSubCategoryName] = useState("");       //subCategory
  const [selectedCategory, setSelectedCategory] = useState("");

  // Product
  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    image: "",
    subCategoryId: "",
  })
  const [variants, setVariants] = useState([{ ram: "", price: "", qty: "", }]);  //variants
  const [preview, setPreview] = useState("");                                     //Image Upload
  const [page, setPage] = useState(1);                                            //pagination



  useEffect(() => {
    const storedUser =
      sessionStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  useEffect(() => {
    getCategories();
    getSubCategories();
    const token =
      sessionStorage.getItem("token");
    if (token) {
      getWishlist();
    }
  }, []);


  useEffect(() => {
    getProducts();
  }, [
    searchTerm,
    selectedSubCategory,
    page
  ]);

  const getProducts = async () => {
    const res = await getAllProductsApi(searchTerm, selectedSubCategory, page);
    if (res.status === 200) {
      //console.log(res.data.allProducts);
      setProducts(res.data.allProducts);
    }
  }

  const getCategories = async () => {
    const res = await getAllCategoriesApi();
    if (res.status === 200) {
      setCategories(res.data);
    }
  }

  const getSubCategories = async () => {
    const res = await getAllSubCategoriesApi();
    if (res.status === 200) {
      setSubCategories(res.data);
    }
  }

  const getWishlist = async () => {
    const res = await getWishlistApi();
    if (res.status === 200) {
      setWishlist(res.data);
    }

  };

  // FILTER PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubCategory = !selectedSubCategory || product.subCategoryId === selectedSubCategory ||
      product.subCategoryId?._id === selectedSubCategory;
    return matchesSearch && matchesSubCategory;
  });

  //Wishlist Toggle
  const toggleWishlist = async (product) => {
    const exists = wishlist.find((item) => item._id === product._id);
    if (!exists) {
      const res = await addWishlistApi(product._id);
      if (res.status === 200) {
        getWishlist();
      }
    }
  }


  // Variants
  const addVariant = () => {
    setVariants([...variants, { ram: "", price: "", qty: "", },]);
  };

  const updateVariant = (index, field, value) => {
    const copy = [...variants];
    copy[index][field] = value;
    setVariants(copy);
  };

  // Category
  const handleAddCategory = async () => {
    if (!categoryName) {
      toast.warning("Category name is required");
      return;
    }
    const result = await addCategoryApi({ categoryName });
    if (result.status === 200) {
      getCategories();
      setCategoryName("");
      setShowCategoryModal(false);
    }
  };

  const handleAddSubCategory = async () => {
    if (!selectedCategory || !subCategoryName.trim()) {
      toast.warning("Please fill all fields");
      return;
    }
    const res = await addSubCategoryApi({ subCategoryName, categoryId: selectedCategory });
    if (res.status === 200) {
      getSubCategories();
      setSubCategoryName("");
      setSelectedCategory("");
      setShowSubCategoryModal(false);
    }
  };

  //Add Product

  const handleAddProduct = async () => {
    if (
      !productData.productName ||
      !productData.description ||
      !productData.subCategoryId ||
      !productData.image
    ) {
      toast.warning("Please fill all fields");
      return;
    }
    const invalidVariant =
      variants.some((item) =>!item.ram || !item.price || !item.qty);
    if (invalidVariant) {
      toast.warning("Fill all variant fields");
      return;
    }
    const reqBody = new FormData();
    reqBody.append("productName", productData.productName);
    reqBody.append("description", productData.description);
    reqBody.append("subCategoryId", productData.subCategoryId);
    reqBody.append("image", productData.image);
    reqBody.append("variants", JSON.stringify(variants));
    const res = await addProductApi(reqBody);
    if (res.status === 200) {
      getProducts();
      setProductData({ productName: "", description: "", image: "", subCategoryId: "", });
      setVariants([{ ram: "", price: "", qty: "", },]);
      setPreview("");
      setShowProductModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        wishlist={wishlist}
        setWishlist={setWishlist}
        user={user}
        setUser={setUser}
      />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="mb-6 text-sm"> Home </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mb-10">
          <button onClick={() => setShowCategoryModal(true)} className="bg-[#F5A623] text-white px-5 py-3 rounded-xl text-sm">
            Add category
          </button>
          <button onClick={() => setShowSubCategoryModal(true)} className="bg-[#F5A623] text-white px-5 py-3 rounded-xl text-sm">
            Add sub category
          </button>
          <button onClick={() => setShowProductModal(true)} className="bg-[#F5A623] text-white px-5 py-3 rounded-xl text-sm">
            Add product
          </button>
        </div>

        {/* Main */}
        <div className="flex gap-12">

          {/* Sidebar */}
          <div className="w-64">
            <Sidebar
              categories={categories}
              subCategories={subCategories}
              selectedSubCategory={selectedSubCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts?.map((product) => {
                const isWishlisted = wishlist.some((item) => item._id === product._id);
                return (
                  <div key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="border rounded-2xl p-4 relative hover:shadow-md transition cursor-pointer">

                    <button onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }} className="absolute right-4 top-4">
                      {isWishlisted ? (<FaHeart className="text-sky-300" />)
                        :
                        (<FaRegHeart className="text-sky-300" />)}
                    </button>

                    <img src={`${baseUrl}/uploads/${product.image}`}
                      alt="" className="w-full h-40 object-contain" />

                    <h3 className="mt-4 text-[#003B5C] font-medium"> {product.productName}</h3>
                    <p className="font-semibold mt-2">₹ {product?.variants?.[0]?.price}</p>
                    {/* Stars */}
                    <div className="flex gap-1 mt-3 text-gray-300">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>

                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-8 gap-3">
              <button onClick={() => setPage(1)}
                className={`w-8 h-8 rounded-full ${page === 1 ? "bg-[#F5A623] text-white" : ""}`}>
                1
              </button>

              <button onClick={() => setPage(2)}>2</button>
              <button onClick={() => setPage(3)}>3</button>
              <button onClick={() => setPage(4)}>4</button>
              <button onClick={() => setPage(5)}>5</button>
            </div>

          </div>
        </div>
      </div>

      {/* Category Modal */}

      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[450px]">
            <div className="flex justify-between mb-5">
              <h2 className="font-semibold text-xl"> Add Category </h2>
              <FaTimes className="cursor-pointer" onClick={() => setShowCategoryModal(false)} />
            </div>

            <input type="text" placeholder="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border p-3 rounded-lg" />

            <button onClick={handleAddCategory} className="mt-5 bg-[#F5A623] text-white px-5 py-3 rounded-lg">
              Save
            </button>

          </div>

        </div>
      )}

      {/* SubCategory Modal */}

      {showSubCategoryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[500px]">
            <div className="flex justify-between mb-5">
              <h2 className="font-semibold text-xl"> Add Sub Category </h2>
              <FaTimes className="cursor-pointer" onClick={() => setShowSubCategoryModal(false)} />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-3 rounded-lg mb-4">
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <input type="text" placeholder="Sub Category Name" value={subCategoryName} onChange={(e) => setSubCategoryName(e.target.value)}
              className="w-full border p-3 rounded-lg" />
            <button onClick={handleAddSubCategory} className="mt-5 bg-[#F5A623] text-white px-5 py-3 rounded-lg">
              Save
            </button>
          </div>

        </div>
      )}
      {/* Product Modal */}

      {showProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[800px] rounded-2xl px-10 py-8">
            <h2 className="text-center text-3xl font-medium mb-10"> Add Product </h2>

            {/* Title */}

            <div className="grid grid-cols-[150px_1fr] items-center mb-6">
              <label className="text-gray-500 text-lg"> Title : </label>
              <input type="text" placeholder="HP AMD Ryzen 3" value={productData.productName}
                onChange={(e) => setProductData({ ...productData, productName: e.target.value, })} className="border rounded-lg px-4 py-3" />
            </div>

            {/* Variants */}

            <div className="grid grid-cols-[150px_1fr] mb-6">
              <label className="text-gray-500 text-lg pt-3">Variants :</label>
              <div>
                {variants.map((variant, index) => (
                  <div key={index} className="flex gap-3 items-center mb-3">

                    <span className="text-gray-400"> Ram: </span>
                    <input type="text" placeholder="4 GB" value={variant.ram} onChange={(e) => updateVariant(index, "ram", e.target.value)}
                      className="border rounded-lg px-3 py-2 w-24" />

                    <span className="text-gray-400"> Price:</span>
                    <input type="number" placeholder="$529" value={variant.price} onChange={(e) => updateVariant(index, "price", e.target.value)}
                      className="border rounded-lg px-3 py-2 w-28" />

                    <span className="text-gray-400"> QTY </span>
                    <input type="number" placeholder="1" value={variant.qty} onChange={(e) => updateVariant(index, "qty", e.target.value)}
                      className="border rounded-lg px-3 py-2 w-24" />

                  </div>
                ))}

                <button onClick={addVariant} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm mt-2">
                  Add variants
                </button>

              </div>
            </div>

            {/* SubCategory */}

            <div className="grid grid-cols-[150px_1fr] items-center mb-6">

              <label className="text-gray-500 text-lg"> Sub category : </label>
              <select value={productData.subCategoryId} onChange={(e) => setProductData({ ...productData, subCategoryId: e.target.value, })}
                className="border rounded-lg px-4 py-3">

                <option value=""> Select Sub Category </option>

                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.subCategoryName}
                  </option>

                ))}
              </select>
            </div>

            {/* Description */}

            <div className="grid grid-cols-[150px_1fr] items-center mb-6">
              <label className="text-gray-500 text-lg"> Description : </label>
              <textarea rows="2" value={productData.description} onChange={(e) => setProductData({ ...productData, description: e.target.value, })}
                className="border rounded-lg px-4 py-3" />
            </div>

            {/* Image */}

            <div className="grid grid-cols-[150px_1fr] items-center mb-8">
              <label className="text-gray-500 text-lg"> Upload image: </label>
              <div className="flex gap-4">
                <label className="w-24 h-24 border rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <input type="file" hidden
                    onChange={(e) => {
                      setProductData({ ...productData, image: e.target.files[0] });
                      setPreview(URL.createObjectURL(e.target.files[0]));
                    }} />
                  <FaPlus className="text-gray-400" />
                </label>

                {preview && (
                  <img
                    src={preview}
                    alt=""
                    className="w-24 h-24 rounded-lg border object-cover"
                  />
                )}
              </div>

            </div>

            {/* Add & Discard Buttons */}

            <div className="flex justify-end gap-4">
              <button onClick={handleAddProduct} className="bg-[#F5A623] text-white px-8 py-2 rounded-lg">
                ADD
              </button>
              <button onClick={() => setShowProductModal(false)} className="text-gray-600 px-6 py-2">
                DISCARD
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;