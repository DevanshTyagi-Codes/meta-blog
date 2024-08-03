import React from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 w-[100px] md:w-[170px] mx-auto"
      onClick={handleLogout}
    >
      <span className="text-white text-xl font-medium">Logout</span>
    </button>
  );
};

export default LogoutBtn;
