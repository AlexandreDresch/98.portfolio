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
    <div className="w-full h-[400px]">
      <div className="grid content-start grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-x-4 gap-y-3">
        {programs.map((program) => (
          <div
            key={program.id}
            className="flex flex-col items-center cursor-pointer w-full h-full"
            onClick={() => handleSelectProgram(program)}
            onDoubleClick={() => handleOpenProgram(program.id)}
          >
            <Image
              src={program.image}
              alt={program.name}
              width={256}
              height={256}
              unoptimized
              className={cn(
                "size-20 object-contain ",
                selectedProgram?.id === program.id && "brightness-75",
              )}
            />

            <p
              className={cn(
                "text-sm",
                selectedProgram?.id === program.id && "text-white bg-[#010f80]",
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
