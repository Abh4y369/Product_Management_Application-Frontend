import baseUrl from "./baseUrl";
import commonApi from "./commonApi";


//================= USER =================

// Signup API
export const signupApi = async (data) => {
    return await commonApi(`${baseUrl}/user/signup`, "POST", data)
}

// Signin API
export const signinApi = async (data) => {
    return await commonApi(`${baseUrl}/user/signin`, "POST", data)
}


// Profile
export const getProfileApi = async () => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/user/profile`, "GET", {}, header)
}


// ================= CATEGORY =================

// Add Category
export const addCategoryApi = async (data) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/category/add`, "POST", data, header)
}

// Get All Categories
export const getAllCategoriesApi = async () => {
    return await commonApi(`${baseUrl}/category/all`, "GET", {}, "")
}


// ================= SUB CATEGORY =================

// Add SubCategory
export const addSubCategoryApi = async (data) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/subcategory/add`, "POST", data, header)
}

// Get All SubCategories
export const getAllSubCategoriesApi = async () => {
    return await commonApi(`${baseUrl}/subcategory/all`, "GET", {}, "")
}


// ================= PRODUCTS =================

// Add Product
export const addProductApi = async (data) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/product/add`, "POST", data, header)
}

// Get All Products
export const getAllProductsApi = async (search = "", subCategoryId = "", page = 1) => {
    return await commonApi(`${baseUrl}/product/all?search=${search}&subCategoryId=${subCategoryId}&page=${page}`, "GET", {}, "")
}

// Get Product By Id
export const getProductByIdApi = async (pid) => {
    return await commonApi(`${baseUrl}/product/${pid}`, "GET", {}, "")
}

// Update Product
export const updateProductApi = async (pid, data) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/product/update/${pid}`, "PUT", data, header)
}

// Delete Product
export const deleteProductApi = async (pid) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/product/delete/${pid}`, "DELETE", {}, header)
}


// ================= WISHLIST =================

// Add Wishlist
export const addWishlistApi = async (pid) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/wishlist/add/${pid}`, "PUT", {}, header)
}

// Get Wishlist
export const getWishlistApi = async () => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/wishlist`, "GET", {}, header)
}

// Remove Wishlist
export const deleteWishlistApi = async (pid) => {
    const header = {
        Authorization: `Token ${sessionStorage.getItem("token")}`
    }
    return await commonApi(`${baseUrl}/wishlist/delete/${pid}`, "DELETE", {}, header)
}