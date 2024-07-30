"use client";

import Clippy from "../shared/clippy";
import Shortcut from "../dock/shortcut";
import { useAppDispatch, useAppSelector } from "@/store/store";
import ProjectContainer from "../folders/project-container";

export default function Desktop() {
  const dispatch = useAppDispatch();
  const { frontend, backend, mobile } = useAppSelector(
    (state) => state.projects
  );

  return (
    <div className="pt-4 flex flex-col gap-8 min-w-[100dvw] min-h-[100dvh] relative overflow-hidden">
      <Shortcut image="/recycle-bin.png" name="Recycle Bin" isDocument={false}>
        <p>Not available yet.</p>
      </Shortcut>
      <Shortcut
        image="/computer-explorer.png"
        name="My Computer"
        isDocument={false}
      >
        <p>Not available yet.</p>
      </Shortcut>

      <Shortcut image="/folder.png" name="BackEnd" isDocument={false}>
        <ProjectContainer projects={backend} />
      </Shortcut>

      <Shortcut image="/folder.png" name="FrontEnd" isDocument={false}>
        <ProjectContainer projects={frontend} />
      </Shortcut>

      <Shortcut image="/folder.png" name="Mobile" isDocument={false}>
        <p>Not available yet.</p>
      </Shortcut>

      <Shortcut
        image="/file.png"
        name="My Resume"
        isDocument
        documentPath="./englishCV.pdf"
      />

      <Shortcut
        image="/help-book.png"
        name="About"
        isDocument
        documentPath=""
      />

      <Shortcut image="/modem.png" name="Contact me" isDocument={false}>
        <p>Not available yet.</p>
      </Shortcut>

      <Clippy />
    </div>
  );
}
