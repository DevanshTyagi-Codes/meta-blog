import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { login as userLogin } from "../store/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    try {
      const session = await signInWithEmailAndPassword(auth, email, password);
      if (session) {
        const userData = auth.currentUser;
        if (userData) {
          dispatch(userLogin(userData.uid));
          navigate("/all-post");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="w-full bg-[#242535] min-h-[79vh] flex justify-center sm:p-5 px-1 py-5 text-white">
      <div className="bg-[#333445] p-3 md:w-[500px] w-[90%] h-[55vh] rounded-md">
        {isSubmitting ? (
          <div className="flex justify-center mt-3 w-full">
            <span className="text-2xl font-bold">Loading...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
            <div className="flex items-center w-full flex-col gap-3 px-3">
              <input
                {...register("userEmail", {
                  required: {
                    value: true,
                    message: "This is the required field",
                  },
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
                type="text"
                className="border h-12 px-2 py-1 text-lg w-full outline-none rounded bg-transparent"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.userEmail && (
                <div className="text-xs text-red-500">
                  {errors.userEmail.message}
                </div>
              )}
              <input
                {...register("passcode", {
                  required: {
                    value: true,
                    message: "Password is the required field",
                  },
                  minLength: { value: 6, message: "Password too short" },
                })}
                type="password"
                className="border h-12 px-2 py-1 text-lg w-full outline-none rounded bg-transparent"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.passcode && (
                <div className="text-xs text-red-500">
                  {errors.passcode.message}
                </div>
              )}
            </div>
            <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 w-[100px] md:w-[170px] mx-auto">
              Login
            </button>
            <div className="w-full flex gap-1 items-center justify-center">
              <span>Create an new Account?</span>
              <Link to="/signup">
                <span className="hover:underline text-blue-800">SignUp</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
