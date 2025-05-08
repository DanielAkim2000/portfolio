import { getAllBlogs } from "@/actions/get-all-blogs";
import { NextResponse } from "next/server";

export const GET = async () => {
  const blogs = await getAllBlogs();
  return NextResponse.json(blogs);
};
