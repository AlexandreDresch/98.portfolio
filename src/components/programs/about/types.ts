export type SectionId =
  | "about"
  | "skills"
  | "features"
  | "contact"
  | "projects"
  | "disclaimer";

export interface Section {
  id: SectionId;
  label: string;
  icon: string;
}
