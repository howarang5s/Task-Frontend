import React from 'react';
import TaskCard from './TaskCard';
import styles from './TaskList.module.css'; // Import the CSS Module

const TaskList = ({ status, tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className={styles.listContainer} role="list" aria-label={`${status} tasks`}> {/* Added role and aria-label */}
      <h2 className={styles.listTitle}>{status}</h2>
      <div className={styles.tasksWrapper}>
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} onEdit={onEditTask} onDeleteTask={onDeleteTask} />
        ))}
        {tasks.length === 0 && <p className={styles.noTasksMessage}>No tasks in this category.</p>}
      </div>
    </div>
  );
};

export default TaskList;
