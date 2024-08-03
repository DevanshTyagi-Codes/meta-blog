import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ uid, title, image }) => {
  const getFilePreview = (imageUrl) => {
    return imageUrl;
  };

  return (
   <div className="w-full">
     <Link to={`/post/${uid}`}>
      <div className="sm:w-[22vw] flex justify-center flex-col w-full h-[40vh] bg-[#3c3d4b] rounded-xl p-4">
        <div className=" w-full h-[30vh] justify-center mb-4">
          <img className="rounded-xl w-full h-full sm:object-cover object-contain" src={getFilePreview(image)} alt={title} />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
   </div>
  );
};

export default PostCard;
