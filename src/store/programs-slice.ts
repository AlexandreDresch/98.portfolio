import { createSlice, PayloadAction,  } from "@reduxjs/toolkit";
import { programs } from "@/constants";

interface Program {
  id: number;
  name: string;
  isOpen: boolean;
  image: string;
}

interface ProgramsState {
  programs: Program[];
  dockPrograms: Program[];
}

const initialState: ProgramsState = {
  programs: programs,
  dockPrograms: [],
};

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    openProgram(state, action: PayloadAction<number>) {
      const programId = action.payload;
      const program = state.programs.find((program) => program.id === programId);

      if (program) {
        program.isOpen = true;

        const dockFolder = state.dockPrograms.find((p) => p.id === programId);
        if (!dockFolder) {
          state.dockPrograms.push({ ...program, isOpen: true });
        } else {
          dockFolder.isOpen = true;
        }
      }
    },

    minimizeProgram(state, action: PayloadAction<number>) {
      const programId = action.payload;
      
      const program = state.programs.find((p) => p.id === programId);
      if (program) {
        program.isOpen = false;
      }

      const dockProgram = state.dockPrograms.find((p) => p.id === programId);
      if (dockProgram) {
        dockProgram.isOpen = false;
      } else {
        const programToAdd = state.programs.find((p) => p.id === programId);
        if (programToAdd) {
          state.dockPrograms.push({ ...programToAdd, isOpen: false });
        }
      }
    },

    toggleProgram(state, action: PayloadAction<number>) {
      const programId = action.payload;
      const program = state.programs.find(p => p.id === programId);
      const dockProgram = state.dockPrograms.find(p => p.id === programId);
    
      if (program) {
        program.isOpen = !program.isOpen;
        
        if (dockProgram) {
          dockProgram.isOpen = program.isOpen;
        } else {
          state.dockPrograms.push({
            id: program.id,
            name: program.name,
            isOpen: program.isOpen,
            image: program.image
          });
        }
      } else if (dockProgram) {
        state.programs.push({
          id: dockProgram.id,
          name: dockProgram.name,
          isOpen: true,
          image: dockProgram.image
        });
        dockProgram.isOpen = true;
      }
    },

    closeProgram(state, action: PayloadAction<number>) {
      const programId = action.payload;
      const program = state.programs.find((prog) => prog.id === programId);

      if (program) {
        program.isOpen = false;
      }
    },
  },
});

export const { openProgram, closeProgram, minimizeProgram, toggleProgram } =
  programsSlice.actions;
export const programsReducer = programsSlice.reducer;
