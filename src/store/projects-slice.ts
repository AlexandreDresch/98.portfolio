import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "@/types";
import { supabase } from "@/lib/services/supabase/client";

interface ErrorDetail {
  message: string;
  code?: number;
}

interface ProjectsState {
  frontend: Project[];
  backend: Project[];
  mobile: Project[];
  selectedProject: Project | null;
  status: "initial" | "pending" | "fulfilled" | "rejected";
  error: ErrorDetail | null;
}

const initialState: ProjectsState = {
  frontend: [],
  backend: [],
  mobile: [],
  selectedProject: null,
  status: "initial",
  error: null,
};

export const getProjectsData = createAsyncThunk<
  Project[],
  void,
  { rejectValue: ErrorDetail }
>("projects/getProjectsData", async (_, { rejectWithValue }) => {
  try {
    const { data: projects, error } = await supabase.from("Project").select();

    if (error) {
      return rejectWithValue({
        message: error.message,
        code: +error.code,
      });
    }

    if (!projects) {
      return rejectWithValue({
        message: "No projects found",
      });
    }

    return projects as Project[];
  } catch (error: any) {
    return rejectWithValue({
      message: error.message,
      code: error.response?.status,
    });
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProjectsData.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        getProjectsData.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.status = "fulfilled";
          action.payload.forEach((project) => {
            if (project.type === "FRONTEND") {
              state.frontend.push(project);
            } else if (project.type === "BACKEND") {
              state.backend.push(project);
            } else if (project.type === "MOBILE") {
              state.mobile.push(project);
            }
          });
        }
      )

      .addCase(getProjectsData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? { message: "Unknown error" };
      });
  },
});

export const { selectProject, clearSelectedProject } = projectsSlice.actions;
export const projectsReducer = projectsSlice.reducer;
