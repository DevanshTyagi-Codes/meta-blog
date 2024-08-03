import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  AllPost,
  Home,
  Login,
  SignUp,
  AddPost,
  Post,
  MyBlog,
} from "./components";
import store from "./store/store.js";
import { Provider} from "react-redux";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/all-post" element={<AllPost />} />
      <Route path="/add-post" element={<AddPost />} />
      <Route path="/my-blog" element={<MyBlog />} />
      <Route path="/post/:slug" element={<Post />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
