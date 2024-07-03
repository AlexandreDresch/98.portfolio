import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getProjects } from "@/services/projects-api";
import { Project } from "@/types";

interface ErrorDetail {
  message: string;
  code?: number;
}

interface ProjectsState {
  projects: Project[];
  status: "initial" | "pending" | "fulfilled" | "rejected";
  error: ErrorDetail | null;
}

const initialState: ProjectsState = {
  projects: [],
  status: "initial",
  error: null,
};

export const getProjectsData = createAsyncThunk<Project[], void, { rejectValue: ErrorDetail }>(
  "projects/getProjectsData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProjects();
      return response;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message,
        code: error.response?.status,
      });
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
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
          state.projects = action.payload;
        }
      )
      .addCase(getProjectsData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload ?? { message: "Unknown error" };
      });
  },
});

export const projectsReducer = projectsSlice.reducer;
