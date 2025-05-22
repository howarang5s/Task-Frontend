import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    selectAllTasks,
    selectTasksLoading,
    selectTasksError
} from './redux/taskSlice'; // Adjust path if needed
import TaskList from './components/TaskList'; // Adjust path if needed
import { TaskCreationModal, TaskEditModal, DeletionConfirmationModal } from './components/Modals'; // Adjust path
import TaskManagementHeader from './components/TaskHeader'; // Import header component
import TaskFilterAndSearch from './components/TaskFilterandSearch'; // Import filter/search component
import useTaskFilteringAndSorting from './hook/filterANDsort'; // Corrected import path for the custom hook
import styles from './App.css'; // Import the new App CSS Module


const App = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectAllTasks);
    const loading = useSelector(selectTasksLoading);
    const error = useSelector(selectTasksError);

    const [isCreationModalOpen, setIsCreationModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // Stores the task object being edited
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingTaskTitle, setDeletingTaskTitle] = useState('');
    const [deletingTaskId, setDeletingTaskId] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch tasks on component mount
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    /**
     * Handles saving a task, either creating a new one or updating an existing one.
     * The decision is based on whether the taskData object contains an _id.
     * @param {object} taskData - The data of the task to be saved.
     */
    const handleSaveTask = (taskData) => {
        if (taskData._id) {
            // If taskData has an _id, it's an edit operation
            dispatch(updateTask(taskData));
        } else {
            // Otherwise, it's a creation operation
            dispatch(createTask(taskData));
        }
        // Close relevant modal and clear editing state
        setIsCreationModalOpen(false);
        setIsEditModalOpen(false);
        setEditingTask(null);
    };

    /**
     * Opens the edit modal and sets the task to be edited.
     * @param {object} task - The task object to be edited.
     */
    const openEditModal = (task) => {
        setEditingTask(task);
        setIsEditModalOpen(true);
    };

    /**
     * Opens the deletion confirmation modal, setting the ID and title of the task to be deleted.
     * @param {string} id - The ID of the task to be deleted.
     * @param {string} title - The title of the task to be deleted.
     */
    const handleOpenDeleteConfirm = (id, title) => {
        setDeletingTaskId(id);
        setDeletingTaskTitle(title);
        setIsDeleteDialogOpen(true);
    };

    /**
     * Confirms and dispatches the task deletion.
     */
    const confirmDeleteTask = () => {
        if (deletingTaskId) {
            dispatch(deleteTask(deletingTaskId));
        }
        setIsDeleteDialogOpen(false);
        setDeletingTaskId('');
        setDeletingTaskTitle('');
    };

    // Use the custom hook for filtering and sorting tasks
    const tasksToDisplay = useTaskFilteringAndSorting(tasks, filterStatus, searchQuery);

    // Group tasks by status for TaskList components
    const todoTasks = tasksToDisplay.filter(task => task.status === 'To Do');
    const inProgressTasks = tasksToDisplay.filter(task => task.status === 'In Progress');
    const doneTasks = tasksToDisplay.filter(task => task.status === 'Done');

    // Display loading or error messages based on Redux state
    if (loading) {
        return <div className={styles.loadingMessage}>Loading tasks...</div>;
    }

    if (error) {
        return <div className={styles.errorMessage}>Error loading tasks: {error}</div>;
    }

    return (
        <div className={styles.appContainer}>
            <div className={styles.mainContentWrapper}>
                {/* Header Section */}
                <TaskManagementHeader onOpenCreationModal={() => setIsCreationModalOpen(true)} />

                {/* Filter and Search Section */}
                <TaskFilterAndSearch
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {/* Task Columns */}
                <div className={styles.taskColumns}>
                    <TaskList status="To Do" tasks={todoTasks} onEditTask={openEditModal} onDeleteTask={handleOpenDeleteConfirm} />
                    <TaskList status="In Progress" tasks={inProgressTasks} onEditTask={openEditModal} onDeleteTask={handleOpenDeleteConfirm} />
                    <TaskList status="Done" tasks={doneTasks} onEditTask={openEditModal} onDeleteTask={handleOpenDeleteConfirm} />
                </div>

                {/* Modals */}
                {isCreationModalOpen && (
                    <TaskCreationModal
                        isOpen={isCreationModalOpen}
                        onClose={() => setIsCreationModalOpen(false)}
                        onSave={handleSaveTask}
                    />
                )}

                {isEditModalOpen && editingTask && (
                    <TaskEditModal
                        isOpen={isEditModalOpen}
                        task={editingTask}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setEditingTask(null);
                        }}
                        onSave={handleSaveTask}
                    />
                )}

                {isDeleteDialogOpen && (
                    <DeletionConfirmationModal
                        isOpen={isDeleteDialogOpen}
                        taskTitle={deletingTaskTitle}
                        onClose={() => {
                            setIsDeleteDialogOpen(false);
                            setDeletingTaskId('');
                            setDeletingTaskTitle('');
                        }}
                        onDelete={confirmDeleteTask}
                    />
                )}
            </div>
        </div>
    );
};

export default App;
