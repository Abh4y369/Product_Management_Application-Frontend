import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../../Services/allApis"
import { toast } from "react-toastify";


const Authentication = () => {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSignup = async () => {
        try {
            const { name, email, password } = user;
            if (!name || !email || !password) {
                toast.warning("Please fill all the fields")
            }
            else {
                const res = await signupApi(user);
                if (res.status === 200) {
                    toast.success("Signup successful! Please login to continue.")
                    setUser({
                        name: "", email: "", password: ""
                    })
                    setIsLogin(true);
                }
                else {
                    toast.error("Signup failed. Please try again.")
                }
            }
        }
        catch (err) {
            console.log(err)
            toast.error("Something went wrong")
        }
    }


    const handleSignin = async () => {
        try {
            const { email, password } = user;
            if (!email || !password) {
                toast.warning("Please fill all fields");
                return;
            } else {
                const result = await signinApi({ email, password });
                if (result.status === 200) {
                    sessionStorage.setItem("token", result.data.token);
                    sessionStorage.setItem("user", result.data.user);
                    toast.success("Login Successful");
                    setUser({
                        name: "", email: "", password: ""
                    });
                    navigate("/");
                }
                else {
                    toast.error(result.data);
                }
            }

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4 md:p-">
            <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">

                {/* Auth Login */}
                {isLogin ? (
                    <>
                        {/* Left Side */}
                        <div className="w-full lg:w-2/3 bg-white flex flex-col justify-center items-center px-6 md:px-10 lg:px-12 py-12">

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E6A112] text-center mb-10">
                                Sign In to <br /> Your Account
                            </h1>
                            <form className="w-full max-w-md space-y-4">

                                <input type="email" name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="w-full bg-[#F3F5F4] p-4 rounded-md outline-none border border-transparent focus:border-[#E6A112]" />

                                <input type="password" name="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="w-full bg-[#F3F5F4] p-4 rounded-md outline-none border border-transparent focus:border-[#E6A112]" />

                                <p className="text-center text-sm font-medium cursor-pointer text-gray-700 hover:text-black">
                                    Forgot Password?
                                </p>
                                <div className="flex justify-center pt-2">
                                    <button type="button"
                                        onClick={handleSignin}
                                        className="bg-[#E6A112] hover:opacity-90 text-white px-10 md:px-16 py-3 rounded-full font-semibold transition" >
                                        SIGN IN
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Right Side */}
                        <div className="w-full lg:w-1/2 min-h-[320px] lg:min-h-full bg-[#003F63] relative flex flex-col justify-center items-center text-white px-6 md:px-10 lg:px-12 py-12 overflow-hidden">

                            {/* Shapes Decoration */}
                            <div className="absolute top-10 left-10 w-16 h-16 bg-white/20 rounded-full"></div>
                            <div className="absolute top-16 right-20 w-28 h-28 bg-white/10 rotate-45"></div>
                            <div className="absolute top-40 right-120 w-28 h-28 bg-white/10 rotate-45"></div>
                            <div className="absolute bottom-20 right-12 w-10 h-10 bg-white/20 rotate-45"></div>
                            <div className="absolute bottom-8 left-16 w-6 h-6 bg-white/20 rounded-full"></div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
                                Hello Friend!
                            </h2>

                            <p className="text-center text-base md:text-lg mb-10 max-w-xs">
                                Enter your personal details and start your journey with us
                            </p>

                            <button onClick={() => setIsLogin(false)}
                                className="border-2 border-white px-10 md:px-14 py-3 rounded-full font-semibold hover:bg-white hover:text-[#003F63] transition" >
                                SIGN UP
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Left Side */}
                        <div className="w-full lg:w-1/2 min-h-[320px] lg:min-h-full bg-[#003F63] relative flex flex-col justify-center items-center text-white px-6 md:px-10 lg:px-12 py-12 overflow-hidden">

                            {/* Shapes Decoration */}
                            <div className="absolute -bottom-30 -left-20 w-64 h-64 bg-white/20 rounded-full"></div>
                            <div className="absolute top-16 right-16 w-14 h-14 bg-white/20 rotate-45"></div>
                            <div className="absolute bottom-50 right-[-30px] w-0 h-0 border-l-[20px] border-l-transparent border-r-[80px] border-r-transparent border-b-[100px] border-b-white/20"></div>
                            <div className="absolute bottom-15 right-30 w-5 h-15 bg-white/20 rotate-125"></div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center">
                                Welcome Back!
                            </h2>
                            <p className="text-center text-base md:text-lg mb-10 max-w-xs">
                                To keep connected with us please login with your personal info
                            </p>
                            <button onClick={() => setIsLogin(true)}
                                className="border-2 border-white px-10 md:px-14 py-3 rounded-full font-semibold hover:bg-white hover:text-[#003F63] transition">
                                SIGN IN
                            </button>
                        </div>

                        {/* Right Side */}
                        <div className="w-full lg:w-2/3 bg-white flex flex-col justify-center items-center px-6 md:px-10 lg:px-12 py-12">

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E6A112] text-center mb-10">
                                Create Account
                            </h1>

                            <form className="w-full max-w-md space-y-4">
                                <input
                                    type="text" name="name" placeholder="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="w-full bg-[#F3F5F4] p-4 rounded-md outline-none border border-transparent focus:border-[#E6A112]" />

                                <input type="email" name="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="w-full bg-[#F3F5F4] p-4 rounded-md outline-none border border-transparent focus:border-[#E6A112]" />

                                <input type="password" name="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    className="w-full bg-[#F3F5F4] p-4 rounded-md outline-none border border-transparent focus:border-[#E6A112]" />
                                <div className="flex justify-center pt-4">
                                    <button type="button"
                                        onClick={handleSignup}
                                        className="bg-[#E6A112] hover:opacity-90 text-white px-10 md:px-16 py-3 rounded-full font-semibold transition">
                                        SIGN UP
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Authentication;