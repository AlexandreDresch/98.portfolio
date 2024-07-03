"use server";

import { Project } from "@/types";
import { projectsInstance } from "./api";

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await projectsInstance.get("/projects");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
}
