import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import PostCard from "./PostCard";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "Blogs"), where("status", "==", "active"));
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
      <div className="flex flex-wrap sm:flex-row flex-col gap-3 justify-center items-center">
        {posts.map((post) => (
          <div className="p-2 sm:w-[22vw] w-[70%]" key={post.id}>
            <PostCard uid={post.id} title={post.title} image={post.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
