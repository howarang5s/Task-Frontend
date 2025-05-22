import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice'; // Import your task slice reducer

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Define your reducers here. Each key will be a slice of your state.
    tasks: taskReducer, // The 'tasks' slice will be managed by taskReducer
    // If you add more slices (e.g., for user authentication, UI settings),
    // you would add them here:
    // users: userReducer,
    // ui: uiReducer,
  },
  // Optionally, you can add middleware, devTools configuration, etc.
  // configureStore sets up Redux Thunk and Redux DevTools Extension by default.
});