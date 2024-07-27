export interface Project {
  id: number;
  name: string;
  description: string;
  done: boolean;
  images: string[];
  deployment_url: string | null;
  github_url: string;
  date: string;
  type: "BACKEND" | "FRONTEND";
}

type ProjectStatus = "initial" | "pending" | "fulfilled" | "rejected";

export interface MessageContainerProps {
  status: ProjectStatus;
  message?: string;
  title?: string;
}
