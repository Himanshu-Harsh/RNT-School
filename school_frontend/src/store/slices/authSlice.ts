import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/lib/api';


export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'finance' | 'studentManager';
  token: string;
  image?: string;
  // Student-specific fields (populated when user is a student)
  admission_no?: string;
  student_name?: string;
  classname?: string;
  roll_no?: string;
  father_name?: string;
}

interface AuthState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

// Check for existing session in LocalStorage (persists login on refresh)
const userInfoFromStorage = localStorage.getItem('userCred')
  ? JSON.parse(localStorage.getItem('userCred')!)
  : null;

const initialState: AuthState = {
  userInfo: userInfoFromStorage,
  loading: false,
  error: null,
};

// --- REAL BACKEND LOGIN ---
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: any, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      // 1. Save to LocalStorage
      localStorage.setItem('userCred', JSON.stringify(data));

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      // Clear storage
      localStorage.removeItem('userCred');
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;