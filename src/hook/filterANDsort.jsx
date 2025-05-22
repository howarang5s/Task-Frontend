// src/hooks/useTaskFilteringAndSorting.js
import { useMemo } from 'react';

/**
 * Custom hook to filter and sort tasks based on status and search query.
 * @param {Array} tasks - The array of all tasks from Redux.
 * @param {string} filterStatus - The current status filter ('All', 'To Do', 'In Progress', 'Done').
 * @param {string} searchQuery - The current search keyword.
 * @returns {Array} - The filtered and sorted array of tasks.
 */
const useTaskFilteringAndSorting = (tasks, filterStatus, searchQuery) => {
    // Use useMemo to re-calculate filtered and sorted tasks only when dependencies change
    const filteredAndSortedTasks = useMemo(() => {
        let result = [...tasks];

        // Filter by status
        if (filterStatus !== 'All') {
            result = result.filter(task => task.status === filterStatus);
        }

        // Search by keyword in title or description
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(task =>
                task.title.toLowerCase().includes(query) ||
                (task.description && task.description.toLowerCase().includes(query))
            );
        }

        // Sort tasks by most recently updated
        // Assumes 'updatedAt' field is available and is a Date string/object
        // If not, fall back to _id (MongoDB ObjectId contains timestamp)
        result.sort((a, b) => {
            const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : (a._id ? new Date(parseInt(a._id.substring(0, 8), 16) * 1000).getTime() : 0);
            const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : (b._id ? new Date(parseInt(b._id.substring(0, 8), 16) * 1000).getTime() : 0);
            return dateB - dateA; // Descending order (most recent first)
        });

        return result;
    }, [tasks, filterStatus, searchQuery]); // Dependencies for useMemo

    return filteredAndSortedTasks;
};

export default useTaskFilteringAndSorting;
