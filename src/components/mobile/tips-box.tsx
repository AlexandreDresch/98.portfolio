"use client";

import { motion } from "framer-motion";

export default function TipsBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: "linear" }}
      className="col-span-2 md:col-span-1 bg-[#fffef7] border-[2px] border-solid border-black border-t-white border-l-white rounded-none p-2 flex flex-col select-none"
      style={{
        fontFamily: `"MS Sans Serif", Tahoma, monospace`,
      }}
    >
      <div className="flex items-start gap-2 mb-2">
        <div className="w-8 h-8 flex items-center justify-center border border-t-[#404040] border-l-[#404040] border-r-white border-b-white bg-[#c0c0c0] text-black text-xs font-bold">
          i
        </div>

        <div className="flex-1">
          <h3 className="text-[11px] font-bold mb-1 text-black">
            Did you know...
          </h3>

          <p className="text-[10px] leading-tight text-black">
            Touch your monitor. It is warm, like flesh.
            <br />
            But it is not flesh.
            <br />
            Not yet.
          </p>
        </div>
      </div>

      <div className="mt-auto text-[10px] font-bold text-black">Tips</div>
    </motion.div>
  );
}
