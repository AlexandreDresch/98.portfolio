"use client";

import type { WindowItem, Folder } from "@/types";
import ProgramsContainer from "../folder/programs-container";
import ProjectContainer from "../folder/project-container";
import { useAppSelector } from "@/store/store";
import NotAvailable from "./not-available";

export default function WindowContentRouter({
  window,
}: {
  window: WindowItem;
}) {
  const { frontend, backend } = useAppSelector(
    (state) => state.projects
  );

  if (window.type === "program") {
    return <ProgramsContainer programs={[window]} />;
  }

  const folder = window as Folder;

  if (folder.name === "Backend") {
    return <ProjectContainer projects={backend} />;
  }

  if (folder.name === "Frontend") {
    return <ProjectContainer projects={frontend} />;
  }

  return <NotAvailable message="Not available yet." />;
}
