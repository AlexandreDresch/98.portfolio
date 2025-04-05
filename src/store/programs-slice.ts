import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { programs } from "@/constants";
import { addDockFolder, FoldersState } from "./folders-slice";
import { Folder } from "@/types";

interface Program {
  id: number;
  name: string;
  isOpen: boolean;
  icon: string;
}

interface ProgramsState {
  programs: Program[];
}

const initialState: ProgramsState = {
  programs: programs,
};

export const addToDock = createAsyncThunk(
  "programs/addToDock",
  async (programId: number, { dispatch, getState }) => {
    const state = getState() as { programs: ProgramsState };
    const program = state.programs.programs.find(p => p.id === programId);

    if (program) {
      const dockFolder = {
        id: program.id,
        name: program.name,
        isOpen: true,
        image: program.icon,
        isProgram: true
      };
      dispatch(addDockFolder(dockFolder as Folder));
    }
  }
);


export const minimizeAndAddToDock = createAsyncThunk(
  "programs/minimizeAndAddToDock",
  async (programId: number, { dispatch, getState }) => {
    dispatch(closeProgram(programId));

    const state = getState() as {
      programs: ProgramsState;
      folders: FoldersState;
    };
    const program = state.programs.programs.find(
      (prog) => prog.id === programId
    );

    if (program) {
      const dockFolder = {
        id: program.id,
        name: program.name,
        isOpen: false,
        image: program.icon,
        isProgram: true,
      };

      dispatch(addDockFolder(dockFolder as Folder));
    }
  }
);

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    openProgram(state, action: PayloadAction<number>) {
      const programId = action.payload;
      const program = state.programs.find((prog) => prog.id === programId);

      if (program) {
        program.isOpen = true;
      }
    },

    toggleProgram(state, action: PayloadAction<number>) {
      const program = state.programs.find((p) => p.id === action.payload);
      if (program) {
        program.isOpen = !program.isOpen;
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
  extraReducers: (builder) => {
    builder.addCase(minimizeAndAddToDock.fulfilled, (state, action) => {
      const programId = action.meta.arg;
      const program = state.programs.find((prog) => prog.id === programId);

      if (program) {
        program.isOpen = false;
      }
    });
  },
});

export const { openProgram, closeProgram, toggleProgram } = programsSlice.actions;
export const programsReducer = programsSlice.reducer;
