import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignInModal from "./signInModal";
import { fetchProfile } from "@/Constants";
import { motion } from "framer-motion";

export default function FollowButton({ targetId }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFollowing = async () => {
      if (session) {
        try {
          const userData = await fetchProfile(session.user.name);
          setIsFollowing(userData.user.following.includes(targetId));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchFollowing();
  }, [session]);

  const handleUpdateFollow = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    try {
      const method = !isFollowing ? "PATCH" : "DELETE";
      const response = await fetch("/api/updateFollow", {
        method,
        body: JSON.stringify({
          user_id: session.user.id,
          target_user_id: targetId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update like count");
      }

      const responseData = await response.json();
      console.log(responseData);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  return (
    <div className="flex-row items-center justify-center">
      {isFollowing ? (
        <motion.button
          whileTap={{ scale: 1.5 }}
          className="m-2 py-1 px-2 text-custom-main-dark text-sm hover:cursor-pointer rounded-md border border-custom-main-dark hover:opacity-50"
          onClick={handleUpdateFollow}
        >
          Following
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 1.5 }}
          className="m-2 py-1 px-2 bg-custom-main-dark text-sm hover:cursor-pointer rounded-md text-white hover:opacity-70"
          onClick={handleUpdateFollow}
        >
          Follow
        </motion.button>
      )}
      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
