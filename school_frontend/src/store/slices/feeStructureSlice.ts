import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";


export interface FeeStructure {
  classname: string;
  admissionFee: number;
  monthlyFee: number;
  examFee: number;
  otherFee: number;
  fine: number;
  busFee: number;
  dressFee: number;
  bookFee: number;
  discount: number;
}

interface FeeStructureState {
  structure: FeeStructure[];
  loading: boolean;
  error: string | null;
}

const initialState: FeeStructureState = {
  structure: [],
  loading: false,
  error: null,
};

// --- ACTIONS ---
export const fetchFeeStructure = createAsyncThunk(
  "feeStructure/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/fee-structure');
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch structure");
    }
  }
);

export const saveFeeStructureDB = createAsyncThunk(
  "feeStructure/save",
  async (structure: FeeStructure[], { rejectWithValue }) => {
    try {
      const { data } = await api.post('/fee-structure', structure);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to save structure");
    }
  }
);

const feeStructureSlice = createSlice({
  name: "feeStructure",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeStructure.pending, (state) => { state.loading = true; })
      .addCase(fetchFeeStructure.fulfilled, (state, action) => { 
        state.loading = false; 
        state.structure = action.payload; 
      })
      .addCase(fetchFeeStructure.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload as string; 
      })
      .addCase(saveFeeStructureDB.pending, (state) => { state.loading = true; })
      .addCase(saveFeeStructureDB.fulfilled, (state) => { 
        state.loading = false; 
      })
      .addCase(saveFeeStructureDB.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload as string; 
      });
  },
});

export default feeStructureSlice.reducer;