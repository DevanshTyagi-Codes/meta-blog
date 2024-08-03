import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, storage, auth } from "../firebase/firebase";
import { ref, deleteObject } from "firebase/storage";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData : false;

  const fetchPost = async () => {
    auth.onAuthStateChanged(async () => {
      const docRef = doc(db, "Blogs", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      } else {
        console.log("user not logged in");
      }
    });
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const getFilePreview = (ImageUrl) => {
    return ImageUrl;
  };

  const deletePost = async () => {
    if (post && post.image) {
      const imageRef = ref(storage, post.image);
      await deleteObject(imageRef);
    }
    await deleteDoc(doc(db, "Blogs", slug));
    navigate("/all-post");
  };

  return post ? (
    <div className="py-8 min-h-[79vh] bg-[#242535] text-white">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={getFilePreview(post.image)}
          alt={post.title}
          className="rounded-xl h-[40vh] md:w-[25vw] w-[50vw] object-contain"
        />

        <div className="absolute right-6 top-6">
          {isAuthor && (
            <div className="flex flex-col gap-2">
              <button
                onClick={deletePost}
                className="lg:w-[8vw] w-[100px] h-10 px-2 py-1 rounded cursor-pointer hover:scale-105 duration-100 text-white font-medium dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 mx-auto mb-2"
              >
                <span className="text-nowrap">Delete Post</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-full mb-6 text-center">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css text-center">{parse(post.content)}</div>
    </div>
  ) : (
    <div className="py-8 min-h-[79vh] bg-[#242535] text-white"></div>
  );
};

export default Post;
