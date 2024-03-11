"use client";
import Image from "next/image";
import { FaFireFlameCurved } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Post({ post }) {
  const {
    _id,
    user_name,
    user_pfp, //not yet implemented; not yet in DB
    recipe_name,
    recipe_image, // stores image url from cloudfront stored in s3 bucket
    recipe_description,
    recipe_likes,
    recipe_time,
    recipe_cals,
  } = post;

  const truncateText = (text) => {
    return text.length > 50 ? text.slice(0, 50) + "..." : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-orange-100 p-7 rounded-xl flex items-center justify-center mx-auto max-w-[400px] border-4 border-black border-opacity-70 mb-6"
    >
      {/* Display the square image if imageURL is provided */}
      {recipe_image && (
        <div>
          <div className="flex items-center mb-3">
            <FaUserCircle className="mr-2" style={{ color: "#FF8C00" }} />
            <div className="font-sand font-extrabold">{user_name}</div>
          </div>
          <img
            src={recipe_image}
            alt="Post Image"
            width={300}
            height={300}
            style={{
              width: "300px",
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
              border: "2px solid #000",
            }}
          />
          <h2 className="font-sans text-xl text-gray-800 font-bold mt-3">
            {recipe_name}
          </h2>
          <div className="flex items-center mt-2 justify-between">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <IoIosTimer />
                <p className="font-sans text-xs text-gray-500">
                  {recipe_time} mins
                </p>
              </div>
              <div className="flex flex-col items-center">
                <FaFireFlameCurved className="text-red-500" />
                <p className="font-sans text-xs text-gray-500">
                  {recipe_cals} cals
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <FaRegHeart style={{ color: "#FF8C00" }} size={20} />
              {recipe_likes}
            </div>
          </div>
          <p className="font-sans text-sm text-gray-800 mt-3">
            {truncateText(recipe_description)}
          </p>
        </div>
      )}
    </motion.div>
  );
}
