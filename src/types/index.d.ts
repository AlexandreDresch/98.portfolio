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