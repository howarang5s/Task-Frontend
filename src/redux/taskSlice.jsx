// src/redux/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // Make sure axios is installed: npm install axios

// Define your backend API base URL
const API_BASE_URL = 'http://localhost:5000/task';

// Async Thunk for creating a new task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, taskData); // POST to /task/create
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async Thunk for fetching all tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`); // GET to /task/tasks
    return response.data;
  } catch (error) {
    // Use rejectWithValue to pass the error message to the rejected action
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async Thunk for updating an existing task
// Changed 'id' to '_id' in destructuring to match payload from TaskForm
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ _id, ...taskData }, { rejectWithValue }) => {
  try {
    // console.log(_id); // Removed previous debugging log
    const response = await axios.put(`${API_BASE_URL}/edit/${_id}`, taskData); // PUT to /task/edit/:_id
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async Thunk for deleting a task
// Changed 'id' to '_id' in destructuring to match payload from TaskForm
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (_id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_BASE_URL}/reove/${_id}`); // DELETE to /task/reove/:_id (assuming 'reove' is intentional, otherwise 'remove')
    return _id; // Return the ID to easily remove it from the state
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Async Thunk for updating task status specifically
// Changed 'id' to '_id' in destructuring to match payload from TaskForm
export const updateTaskStatus = createAsyncThunk('tasks/updateTaskStatus', async ({ _id, status }, { rejectWithValue }) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/tasks/${_id}/status`, { status }); // PATCH to /task/tasks/:_id/status
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Create the task slice
const taskSlice = createSlice({
  name: 'tasks', // The name of this slice
  initialState: {
    items: [],      // Array to hold the tasks
    loading: false, // Loading indicator for async operations
    error: null,    // Stores any error messages
  },
  reducers: {
    // Synchronous reducers go here if needed.
  },
  // extraReducers handle actions dispatched by createAsyncThunk
  extraReducers: (builder) => {
    builder
      // --- fetchTasks ---
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // Update tasks with fetched data
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch tasks'; // Use payload for error message
      })
      // --- createTask ---
      .addCase(createTask.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new task to the array
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to create task';
      })
      // --- updateTask ---
      .addCase(updateTask.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        // Find the updated task and replace it in the array
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update task';
      })
      // --- deleteTask ---
      .addCase(deleteTask.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        // Remove the deleted task from the array by its ID
        state.items = state.items.filter(task => task._id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload || 'Failed to delete task';
      })
      // --- updateTaskStatus ---
      .addCase(updateTaskStatus.pending, (state) => {
        state.error = null; // Clear previous errors
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        // Find the updated task and replace it in the array
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTaskStatus.rejected, (state, action) => {
        state.error = action.payload || 'Failed to update task status';
      });
  },
});

// Export the reducer as default
export default taskSlice.reducer;

// Export selectors to easily access parts of the state
export const selectAllTasks = (state) => state.tasks.items;
export const selectTasksLoading = (state) => state.tasks.loading;
export const selectTasksError = (state) => state.tasks.error;
