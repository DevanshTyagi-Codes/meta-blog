import React, { useCallback, useEffect, useState } from "react";
import { RTE } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { storage, db } from "../firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

const AddPost = ({ post }) => {
  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [img, setImg] = useState(null);

  const uploadImage = async (slug) => {
    if (img) {
      const imageRef = ref(storage, `Images/${slug}`);
      await uploadBytes(imageRef, img);
      const imageUrl = await getDownloadURL(imageRef);
      return imageUrl;
    }
    return null;
  };

  const addPost = async (data) => {
    if (!data.title || !data.content || !data.slug) {
      alert("Some Fields are missing! ");
    }

    const imageUrl = await uploadImage(data.slug);
    const postData = {
      title: data.title,
      content: data.content,
      slug: data.slug,
      status: data.status,
      image: imageUrl || post?.image || null,
      userId: userData,
    };

    const blogRef = collection(db, "Blogs");
    if (post) {
    } else {
      await addDoc(blogRef, postData);
    }

    navigate("/all-post");
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/\s/g, "_");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  return (
    <div className="min-h-[79vh] bg-[#242535] text-white py-2">
      <form onSubmit={handleSubmit(addPost)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <div>
            <input
              type="text"
              label="Title :"
              placeholder="Title"
              className="mb-4 px-3 py-2 rounded-lg text-white outline-none duration-200 border border-gray-200 w-full bg-transparent"
              {...register("title", { required: true })}
            />
            <input
              type="text"
              label="Slug :"
              placeholder="Slug"
              disabled
              className="mb-4 px-3 py-2 rounded-lg bg-transparent text-white  outline-none duration-200 border border-gray-200 w-full"
              {...register("slug", { required: true })}
            />
          </div>
          <RTE
            label={"Content"}
            defaultValues={getValues("content")}
            control={control}
          />
        </div>
        <div className="w-1/3 px-2 flex flex-col gap-3">
          <input
            type="file"
            className="mb-4 px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <select
            label="Status"
            id=""
            className="px-3 py-2 rounded-lg bg-transparent text-white outline-none  duration-200 border border-gray-200 w-full"
            {...register("status", { required: true })}
          >
            <option className="text-black" value="active">
              Active
            </option>
            <option className="text-black" value="inactive">
              Inactive
            </option>
          </select>
          <button
            type="submit"
            className="md:w-[10vw] w-[100px] h-10 px-2 py-1 rounded cursor-pointer hover:scale-105 duration-100 text-white font-medium dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 mx-auto mb-2"
          >
            {post ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
