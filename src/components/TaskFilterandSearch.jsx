import React from 'react';
import styles from './TaskFilterandSearch.module.css'; // Import the CSS Module

const TaskFilterAndSearch = ({ filterStatus, setFilterStatus, searchQuery, setSearchQuery }) => {
    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Search tasks by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
                aria-label="Search tasks" // Added for accessibility
            />
            <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.statusSelect}
                aria-label="Filter tasks by status" // Added for accessibility
            >
                <option value="All">All Statuses</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    );
};

export default TaskFilterAndSearch;
