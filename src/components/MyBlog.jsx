import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";

const MyBlog = () => {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "Blogs"), where("userId", "==", userData));
      const querySnapshot = await getDocs(q);
      const postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
    };
    fetchPosts();
  }, []);

  return (
    <div className="w-full py-8 flex justify-center min-h-[79vh] bg-[#242535] text-white">
      <div className="flex flex-wrap sm:flex-row gap-3 flex-col justify-center items-center">
        {posts.length === 0 ? (
          <div>
            {" "}
            <h1 className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
              You have not created any blog yet.
            </h1>
          </div>
        ) : (
          posts.map((post) => (
            <div className="p-2 sm:w-[22vw] w-[70%]" key={post.id}>
              <PostCard uid={post.id} title={post.title} image={post.image} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlog;
