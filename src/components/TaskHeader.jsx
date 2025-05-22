import React from 'react';
import styles from './TaskHeader.module.css'; // Import the CSS Module

const TaskManagementHeader = ({ onOpenCreationModal }) => {
    const handleClick = () => {
        console.log('TaskHeader: Create New Task button clicked');
        onOpenCreationModal();
    };

    return (
        <div className={styles.headerContainer}>
            <h1 className={styles.title}>Task Management</h1>
            <button
                onClick={handleClick} // Use the new handleClick
                className={styles.createButton}
                type="button" // Ensure it's explicitly a button
                title="Click to create a new task" // Added for accessibility
            >
                Create New Task
            </button>
        </div>
    );
};

export default TaskManagementHeader;
