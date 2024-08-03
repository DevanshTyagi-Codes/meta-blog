import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[79vh] p-5 bg-[#242535] text-white">
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
          Rapidly build modern blogs with the fast service of firebase.
        </h1>
      </div>
      <div className="mt-6 sm:mt-10 flex justify-center space-x-6">
      <Link to='/login' className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">Get Stared</Link>
      </div>
    </div>
  );
};

export default Home;
