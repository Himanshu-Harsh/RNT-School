import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";


export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

export const fetchExpenses = createAsyncThunk("expenses/fetch", async () => {
  const { data } = await api.get('/expenses');
  return data;
});

export const addExpense = createAsyncThunk("expenses/add", async (expense: Expense) => {
  const { data } = await api.post('/expenses', expense);
  return data;
});

export const deleteExpense = createAsyncThunk("expenses/delete", async (id: string) => {
  await api.delete(`/expenses/${id}`);
  return id;
});

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => { state.expenses = action.payload; })
      .addCase(addExpense.fulfilled, (state, action) => { state.expenses.unshift(action.payload); })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.expenses = state.expenses.filter(e => e._id !== action.payload);
      });
  },
});

export default expenseSlice.reducer;