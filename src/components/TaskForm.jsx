import React, { useState, useEffect } from 'react';
import styles from './TaskForm.module.css'; // Import the CSS Module

// Added allTasks prop to receive the current list of tasks for validation
const TaskForm = ({ initialTask, onSave, onCancel, isEditing, allTasks }) => {
    const [title, setTitle] = useState(initialTask?.title || '');
    const [description, setDescription] = useState(initialTask?.description || '');
    const [deadline, setDeadline] = useState(initialTask?.deadline || '');
    const [status, setStatus] = useState(initialTask?.status || 'To Do');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Update form fields when initialTask changes (for editing)
        if (initialTask) {
            setTitle(initialTask.title);
            setDescription(initialTask.description);
            // Format deadline for input type="date"
            const formattedDate = initialTask.deadline ? new Date(initialTask.deadline).toISOString().split('T')[0] : '';
            setDeadline(formattedDate);
            setStatus(initialTask.status);
        } else {
            // Reset form fields when creating a new task
            setTitle('');
            setDescription('');
            setDeadline('');
            setStatus('To Do');
        }
    }, [initialTask, isEditing]);

    const validateForm = () => {
        const newErrors = {};
        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            newErrors.title = 'Title is required';
        } else if (trimmedTitle.length > 100) {
            newErrors.title = 'Title cannot exceed 100 characters';
        }

        if (description.length > 500) {
            newErrors.description = 'Description cannot exceed 500 characters';
        }

        // --- Duplicate Title Validation within the same status group ---
        if (allTasks && trimmedTitle) { // Only validate if allTasks is provided and title is not empty
            const isDuplicate = allTasks.some(task =>
                task.title.trim().toLowerCase() === trimmedTitle.toLowerCase() && // Case-insensitive title check
                task.status === status && // Check within the same status group
                (isEditing ? task._id !== initialTask._id : true) // Exclude current task if editing
            );

            if (isDuplicate) {
                newErrors.title = `A task with the title "${trimmedTitle}" already exists in the "${status}" category.`;
            }
        }
        // --- End Duplicate Title Validation ---

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const taskData = {
                title,
                description,
                deadline,
                status,
            };

            // Crucial: If editing, include the _id from the initialTask
            if (isEditing && initialTask?._id) {
                taskData._id = initialTask._id;
            }

            onSave(taskData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                    Title <span className={styles.required}>*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    aria-required="true" // Added for accessibility
                    aria-invalid={errors.title ? 'true' : 'false'} // Added for accessibility
                    aria-describedby={errors.title ? 'title-error' : undefined} // Added for accessibility
                />
                {errors.title && <p id="title-error" className={styles.errorText}>{errors.title}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={`${styles.input} ${styles.textarea}`} // Apply both input and textarea styles
                    aria-invalid={errors.description ? 'true' : 'false'} // Added for accessibility
                    aria-describedby={errors.description ? 'description-error' : undefined} // Added for accessibility
                ></textarea>
                {errors.description && <p id="description-error" className={styles.errorText}>{errors.description}</p>}
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="deadline" className={styles.label}>
                    Deadline
                </label>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className={styles.input}
                    aria-label="Task deadline date" // Added for accessibility
                />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="status" className={styles.label}>
                    Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className={`${styles.select} ${styles.input}`} // Apply both input and select styles
                    aria-label="Task status" // Added for accessibility
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
            </div>
            <div className={styles.buttonContainer}>
                <button
                    type="button"
                    onClick={onCancel}
                    className={styles.buttonCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.buttonSubmit}
                >
                    {isEditing ? 'Save Changes' : 'Add Task'}
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
