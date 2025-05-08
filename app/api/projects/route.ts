import { getAllProjects } from "@/actions/get-all-projects";
import { NextResponse } from "next/server";

export const GET = async () => {
  const projects = await getAllProjects();
  return NextResponse.json(projects);
};
