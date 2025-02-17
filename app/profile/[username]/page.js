import NotFoundPage from "@/app/not-found";
import Profile from "@/components/profile";
import ProfilePosts from "@/components/profilePosts";
import Link from "next/link";
import { fetchProfile } from "@/Constants";

export default async function ProfilePage({ params }) {
  const { username } = params;
  const profile = await fetchProfile(username);

  if (!profile) {
    return <NotFoundPage />;
  }

  return (
    <div className="h-[85vh]">
      <Profile
        profile={{
          id: profile?.user?.id,
          userName: profile?.user?.username,
          postCount: profile?.user?.postCount,
          followerCount: profile?.user?.followerCount,
          followingCount: profile?.user?.followingCount,
          bio: profile?.user?.bio,
          imageURL: profile?.user?.pfpUrl,
        }}
      />
      {profile?.user?.postCount > 0 ? (
        <div className="grid gap-y-10 my-10 ml-96 mr-28 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          {profile.posts.map((post) => (
            <Link
              key={post._id}
              href={`/recipes/${post._id}`}
              className="hover:opacity-90 transition-opacity ease-linear"
            >
              <ProfilePosts
                posts={{
                  title: post.recipe_name,
                  likeCount: post.recipe_likes,
                  imageURL: post.recipe_image,
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 flex items-center justify-center mt-36">
          No posts yet.
        </div>
      )}
    </div>
  );
}
