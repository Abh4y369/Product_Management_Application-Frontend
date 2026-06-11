import baseUrl from "./baseUrl";
import commonApi from "./commonApi";

// <!-- Signup API -->
export const signupApi=async(data)=>{
    return await commonApi(`${baseUrl}/signup`, "POST", data)
}

// <!-- Signin API -->
export const signinApi=async(data)=>{
    return await commonApi(`${baseUrl}/signin`, "POST", data)
}

