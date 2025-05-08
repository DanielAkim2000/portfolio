import { getBlog as getBlogAction } from "@/actions/get-blog";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }
  const blog = await getBlogAction(id);
  return NextResponse.json(blog);
};
