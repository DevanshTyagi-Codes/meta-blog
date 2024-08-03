import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import {ToastContainer ,useToastContainer , toast} from 'react-toastify'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async (data) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const userData = auth.currentUser;
      if (userData) {
        await setDoc(doc(db, "Users", userData.uid), {
          email: userData.email,
          Name: data.name,
        });
        dispatch(login(userData.uid));
        navigate("/all-post");
      }
    } catch (error) {
      console.log(error);
      alert("Email Already in Use")
    }
  };

  return (
    <div className="w-full bg-[#242535] min-h-[79vh] flex justify-center sm:p-5 px-1 py-5 text-white">
      <div className="bg-[#333445] p-3  md:w-[500px] w-[90%] h-[55vh] rounded-md">
        {isSubmitting ? (
          <div className="w-full flex justify-center mt-3">
            <span className="text-2xl font-semibold">Loading...</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(signup)} className="flex flex-col gap-4">
            <div className="flex items-center w-full flex-col gap-3 px-3">
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "This is a required field",
                  },
                })}
                type="text"
                className="border h-12 px-2 py-1 text-lg w-full outline-none rounded bg-transparent"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <div className="text-xs text-red-500">
                  {errors.name.message}
                </div>
              )}
              <input
                {...register("userEmail", {
                  required: {
                    value: true,
                    message: "This is a required field",
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
                {...register("password", {
                  required: {
                    value: true,
                    message: "This is a required field",
                  },
                  minLength: { value: 6, message: "Password is too short" },
                })}
                type="password"
                className="border h-12 px-2 py-1 text-lg w-full outline-none rounded bg-transparent"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="text-xs text-red-500">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 w-[100px] md:w-[170px] mx-auto">
              SignUp
            </button>
            <div className="w-full flex gap-1 items-center justify-center">
              <span>Already have an Account?</span>
              <Link to="/login">
                <span className="hover:underline text-blue-800">Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
   
    </div>
  );
};

export default SignUp;
