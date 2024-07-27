"use server";

import { Project } from "@/types";
import apiInstance from "./api";

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await apiInstance("/projects", {
      method: "GET",
    });
    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}
