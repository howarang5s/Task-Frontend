import React from 'react';
import { useDispatch } from 'react-redux';
// Removed updateTaskStatus import as status change will be via edit modal or separate mechanism
import { Edit, Trash2 } from 'lucide-react'; // Import icons
import styles from './TaskCard.module.css'; // Import the CSS Module

const TaskCard = ({ task, onEdit, onDeleteTask, className }) => { // Accept className prop
  const dispatch = useDispatch();

  // The status change functionality will typically be handled via the Edit modal
  // or a separate mechanism in a table view, not a direct select on each row.
  // We remove handleStatusChange and the select element.

  const handleDeleteClick = () => {
    onDeleteTask(task._id, task.title);
  };

  const formattedDeadline = task.deadline
    ? new Date(task.deadline).toLocaleDateString()
    : 'No Deadline';

  // Determine the status class for highlighting
  const getStatusClass = (taskStatus) => {
    switch (taskStatus) {
      case 'To Do':
        return styles.statusTodo;
      case 'In Progress':
        return styles.statusInProgress;
      case 'Done':
        return styles.statusDone;
      default:
        return '';
    }
  };

  return (
    // Apply the passed className (styles.gridRowItem from TaskList) along with existing card styles
    <div
      className={`${className} ${task.isOverdue ? styles.overdueCard : styles.card}`}
      role="row" // Semantic role for a grid row
      aria-label={`Task: ${task.title}`}
    >
      {/* Each of these divs acts as a 'cell' in the grid row */}
      <div className={styles.cell}>
        <h3 className={styles.title}>{task.title}</h3>
      </div>
      <div className={styles.cell}>
        <p className={styles.description}>{task.description || 'N/A'}</p>
      </div>
      <div className={styles.cell}>
        <p className={styles.deadline}>
          <span className={task.isOverdue ? styles.overdueDeadlineText : ''}>{formattedDeadline}</span>
        </p>
      </div>
      <div className={styles.cell}>
        <span className={getStatusClass(task.status)}>
          {task.status}
        </span>
      </div>
      <div className={`${styles.cell} ${styles.actionCell}`}> {/* Add actionCell for specific alignment */}
        <div className={styles.actionButtons}>
          <button
            onClick={() => onEdit(task)}
            className={styles.editButton}
            title="Edit Task"
            aria-label={`Edit task: ${task.title}`}
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={handleDeleteClick}
            className={styles.deleteButton}
            title="Delete Task"
            aria-label={`Delete task: ${task.title}`}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
