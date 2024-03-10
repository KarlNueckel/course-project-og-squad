import RecipePost from "@/models/post";
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
  try {
    const {
      user_id,
      user_name,
      recipe_name,
      recipe_time,
      recipe_image,
      recipe_cals,
      recipe_description,
      recipe_steps,
      recipe_ingredients,
      recipe_attributes,
    } = await req.json();

    const recipe_likes = 0;

    await connectMongoDB();

    const createdRecipePost = await RecipePost.create({
      user_id,
      user_name,
      recipe_name,
      recipe_image,
      recipe_time,
      recipe_cals,
      recipe_description,
      recipe_steps,
      recipe_ingredients,
      recipe_attributes,
      recipe_likes,
    });

    console.log(createdRecipePost);

    // Find user and push post id to users posts
    await User.findOneAndUpdate(
      { _id: user_id },
      { $inc: { postCount: 1 }, $push: { posts: createdRecipePost._id } },
      { new: true }
    );

    return NextResponse.json(
      { message: "New Post Added to DB." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error has occured while adding new post to DB." },
      { status: 500 }
    );
  }
}
