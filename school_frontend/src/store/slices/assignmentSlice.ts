import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/api';

// ============================================
// ASSIGNMENTS THUNKS
// ============================================

export const fetchAllAssignments = createAsyncThunk(
  'assignments/fetchAll',
  async (filters: { classname?: string; subject?: string; teacher_id?: string } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/assignments', { params: filters });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch assignments');
    }
  }
);

export const fetchAssignmentsByClass = createAsyncThunk(
  'assignments/fetchByClass',
  async (classname: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/assignments/class/${classname}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch assignments');
    }
  }
);

export const createAssignment = createAsyncThunk(
  'assignments/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: result } = await api.post('/assignments', data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create assignment');
    }
  }
);

export const updateAssignment = createAsyncThunk(
  'assignments/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const { data: result } = await api.put(`/assignments/${id}`, data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update assignment');
    }
  }
);

export const deleteAssignment = createAsyncThunk(
  'assignments/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/assignments/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete assignment');
    }
  }
);

export const submitAssignment = createAsyncThunk(
  'assignments/submit',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: result } = await api.post('/assignments/submit', data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to submit assignment');
    }
  }
);

export const fetchAssignmentSubmissions = createAsyncThunk(
  'assignments/fetchSubmissions',
  async (assignmentId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/assignments/${assignmentId}/submissions`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch submissions');
    }
  }
);

export const gradeAssignment = createAsyncThunk(
  'assignments/grade',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const { data: result } = await api.put(`/assignments/submissions/${id}/grade`, data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to grade assignment');
    }
  }
);

// ============================================
// QUIZZES THUNKS
// ============================================

export const fetchAllQuizzes = createAsyncThunk(
  'quizzes/fetchAll',
  async (filters: { classname?: string; subject?: string; teacher_id?: string } = {}, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/quizzes', { params: filters });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch quizzes');
    }
  }
);

export const fetchQuizzesByClass = createAsyncThunk(
  'quizzes/fetchByClass',
  async (classname: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/quizzes/class/${classname}`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch quizzes');
    }
  }
);

export const fetchQuizForTaking = createAsyncThunk(
  'quizzes/fetchForTaking',
  async (quizId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/quizzes/${quizId}/take`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch quiz');
    }
  }
);

export const createQuiz = createAsyncThunk(
  'quizzes/create',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: result } = await api.post('/quizzes', data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create quiz');
    }
  }
);

export const updateQuiz = createAsyncThunk(
  'quizzes/update',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const { data: result } = await api.put(`/quizzes/${id}`, data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update quiz');
    }
  }
);

export const deleteQuiz = createAsyncThunk(
  'quizzes/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/quizzes/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to delete quiz');
    }
  }
);

export const submitQuiz = createAsyncThunk(
  'quizzes/submit',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: result } = await api.post('/quizzes/submit', data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to submit quiz');
    }
  }
);

export const fetchQuizSubmissions = createAsyncThunk(
  'quizzes/fetchSubmissions',
  async (quizId: string, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/quizzes/${quizId}/submissions`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch submissions');
    }
  }
);

export const gradeQuiz = createAsyncThunk(
  'quizzes/grade',
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const { data: result } = await api.put(`/quizzes/submissions/${id}/grade`, data);
      return result;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to grade quiz');
    }
  }
);

// ============================================
// STUDENT-SPECIFIC THUNKS
// ============================================

// Check if student already submitted an assignment
export const fetchStudentSubmission = createAsyncThunk(
  'assignments/fetchStudentSubmission',
  async ({ assignmentId, admissionNo }: { assignmentId: string; admissionNo: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/assignments/${assignmentId}/submission/${admissionNo}`);
      return { assignmentId, submission: data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch submission');
    }
  }
);

// Check if student already submitted a quiz
export const fetchStudentQuizSubmission = createAsyncThunk(
  'quizzes/fetchStudentSubmission',
  async ({ quizId, admissionNo }: { quizId: string; admissionNo: string }, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/quizzes/${quizId}/submission/${admissionNo}`);
      return { quizId, submission: data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch quiz submission');
    }
  }
);

// ============================================
// SLICE
// ============================================

interface AssignmentState {
  assignments: any[];
  quizzes: any[];
  currentQuiz: any | null;
  submissions: any[];
  quizSubmissions: any[];
  // Maps: id -> submission (for student's own submissions)
  myAssignmentSubmissions: Record<string, any>;
  myQuizSubmissions: Record<string, any>;
  loading: boolean;
  error: string | null;
}

const initialState: AssignmentState = {
  assignments: [],
  quizzes: [],
  currentQuiz: null,
  submissions: [],
  quizSubmissions: [],
  myAssignmentSubmissions: {},
  myQuizSubmissions: {},
  loading: false,
  error: null
};

const assignmentSlice = createSlice({
  name: 'assignment',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentQuiz: (state) => {
      state.currentQuiz = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Assignments
      .addCase(fetchAllAssignments.pending, (state) => { state.loading = true; })
      .addCase(fetchAllAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAllAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAssignmentsByClass.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAssignmentsByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignmentsByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAssignment.fulfilled, (state, action) => {
        state.assignments.unshift(action.payload);
      })
      .addCase(updateAssignment.fulfilled, (state, action) => {
        const idx = state.assignments.findIndex(a => a._id === action.payload._id);
        if (idx !== -1) state.assignments[idx] = action.payload;
      })
      .addCase(deleteAssignment.fulfilled, (state, action) => {
        state.assignments = state.assignments.filter(a => a._id !== action.payload);
      })
      .addCase(fetchAssignmentSubmissions.fulfilled, (state, action) => {
        state.submissions = action.payload;
      })
      // Quizzes
      .addCase(fetchAllQuizzes.pending, (state) => { state.loading = true; })
      .addCase(fetchAllQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchAllQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuizzesByClass.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchQuizzesByClass.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(fetchQuizzesByClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchQuizForTaking.fulfilled, (state, action) => {
        state.currentQuiz = action.payload;
      })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.quizzes.unshift(action.payload);
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        const idx = state.quizzes.findIndex(q => q._id === action.payload._id);
        if (idx !== -1) state.quizzes[idx] = action.payload;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter(q => q._id !== action.payload);
      })
      .addCase(fetchQuizSubmissions.fulfilled, (state, action) => {
        state.quizSubmissions = action.payload;
      })
      // Student's own submissions
      .addCase(fetchStudentSubmission.fulfilled, (state, action) => {
        const { assignmentId, submission } = action.payload;
        if (submission) {
          state.myAssignmentSubmissions[assignmentId] = submission;
        }
      })
      .addCase(fetchStudentQuizSubmission.fulfilled, (state, action) => {
        const { quizId, submission } = action.payload;
        if (submission) {
          state.myQuizSubmissions[quizId] = submission;
        }
      });
  }
});

export const { clearError, clearCurrentQuiz } = assignmentSlice.actions;
export default assignmentSlice.reducer;
