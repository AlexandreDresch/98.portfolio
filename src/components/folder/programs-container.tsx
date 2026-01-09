"use client";

import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { openWindow, selectProgram } from "@/store/window-manager-slice";
import type { Program, ProgramsContainerProps } from "@/types";
import Image from "next/image";

export default function ProgramsContainer({
  programs,
}: ProgramsContainerProps) {
  const dispatch = useAppDispatch();
  const { selectedProgram } = useAppSelector((state) => state.windows);

  const handleSelectProgram = (program: Program) => {
    dispatch(selectProgram(program.id));
  };

  const handleOpenProgram = (id: number) => {
    dispatch(openWindow(id));
  };

  return (
    <div className="w-full h-[400px] flex justify-center">
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 gap-y-0 p-4">
        {programs.map((program) => (
          <div
            key={program.id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleSelectProgram(program)}
            onDoubleClick={() => handleOpenProgram(program.id)}
          >
            <Image
              src={program.image}
              alt={program.name}
              width={40}
              height={40}
              className={cn(
                selectedProgram?.id === program.id && "brightness-75"
              )}
            />

            <p
              className={cn(
                "text-sm",
                selectedProgram?.id === program.id && "text-white bg-[#010f80]"
              )}
            >
              {program.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
