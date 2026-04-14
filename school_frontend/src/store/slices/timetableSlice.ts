import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";


export interface TimetableEntry {
  _id?: string;
  classname: string;
  subject: string;
  teacherId: string;
  teacherName: string;
  day: string; // e.g., "Monday", "Tuesday"
  startTime: string; // "09:00"
  endTime: string; // "10:00"
}

interface TimetableState {
  schedule: TimetableEntry[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: TimetableState = {
  schedule: [],
  loading: false,
  success: false,
  error: null,
};

// --- API ACTIONS ---

export const createTimetableEntry = createAsyncThunk(
  "timetable/create",
  async (entry: TimetableEntry, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/timetable', entry);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to assign class");
    }
  }
);

export const getTimetable = createAsyncThunk(
  "timetable/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/timetable');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to load timetable");
    }
  }
);

const timetableSlice = createSlice({
  name: "timetable",
  initialState,
  reducers: {
    resetTimetable: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTimetableEntry.fulfilled, (state, action) => {
        state.schedule.push(action.payload);
        state.success = true;
      })
      .addCase(getTimetable.fulfilled, (state, action) => {
        state.schedule = action.payload;
      });
  },
});

export const { resetTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;