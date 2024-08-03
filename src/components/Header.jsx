import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogoutBtn } from "./index";
import Logo from "../assets/metablog.png";

const Header = () => {
  const isActive = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navLinks = [
    {
      name: "Home",
      slug: "/",
      active: !isActive,
    },
    {
      name: "Login",
      slug: "/login",
      active: !isActive,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !isActive,
    },
    {
      name: "All-Post",
      slug: "/all-post",
      active: isActive,
    },
    {
      name: "My-Blogs",
      slug: "/my-blog",
      active: isActive,
    },
    {
      name: "Add-Post",
      slug: "/add-post",
      active: isActive,
    },
  ];
  return (
    <div className="bg-[#242535] w-full h-[9vh] flex items-center justify-center sm:justify-around sm:px-4">
      <div className="sm:flex sm:gap-3 gap-[1px] items-center text-white hidden">
        <img
          src={Logo}
          className="h-8 w-8 object-contain rounded-full"
          alt=""
        />
        <div>
          <span className="text-xl">Meta</span>
          <span className="font-bold text-xl">Blog</span>
        </div>
      </div>
      <div className="flex items-center sm:gap-5 gap-6">
        {navLinks.map((item) =>
          item.active ? (
            <div key={item.slug}>
              <button
                onClick={() => navigate(item.slug)}
                className="flex justify-center items-center w-24 text-nowrap py-2 duration-200 hover:bg-slate-600 rounded-lg"
              >
                <span className="text-white text-xl font-medium">
                  {item.name}
                </span>
              </button>
            </div>
          ) : null
        )}
      </div>
      <div className="fixed md:bottom-12 md:right-6 bottom-16 right-2">{isActive && <LogoutBtn />}</div>
    </div>
  );
};

export default Header;
