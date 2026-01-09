"use client";

import { motion } from "framer-motion";
import ProgramsContainer from "../folder/programs-container";
import { programs } from "@/constants";

export default function ControlPanel() {
  const controlPanelPrograms = programs.filter((p) =>
    [19, 20, 21, 22, 23].includes(p.id)
  );
  return (
    <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
      <ProgramsContainer programs={controlPanelPrograms} />
    </motion.div>
  );
}
