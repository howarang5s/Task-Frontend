import React from 'react';
import TaskForm from './TaskForm';
import styles from './Modals.module.css'; // Import the CSS Module

// Basic Modal Wrapper Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}> {/* Close modal on overlay click */}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside content from closing modal */}
                {children}
            </div>
        </div>
    );
};

// Basic Modal Header Component
const ModalHeader = ({ title, description, onClose }) => ( // Added onClose prop for the close button
    <div className={styles.modalHeader}>
        <h2 className={styles.modalTitle}>{title}</h2>
        {description && <p className={styles.modalDescription}>{description}</p>}
        {onClose && ( // Conditionally render close button if onClose is provided
            <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 6L6 18" />
                    <path d="M6 6L18 18" />
                </svg>
            </button>
        )}
    </div>
);

// Basic Modal Footer Component
const ModalFooter = ({ children }) => (
    <div className={styles.modalFooter}>
        {children}
    </div>
);


const TaskCreationModal = ({ isOpen, onClose, onSave }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader
                title="Create New Task"
                description="Enter the details for the new task below."
                onClose={onClose} // Pass onClose to ModalHeader for the close button
            />
            <TaskForm
                onSave={(taskData) => {
                    onSave(taskData);
                    onClose();
                }}
                onCancel={onClose}
                isEditing={false}
            />
        </Modal>
    );
};

const TaskEditModal = ({ isOpen, task, onClose, onSave }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader
                title="Edit Task"
                description="Modify the task details below."
                onClose={onClose} // Pass onClose to ModalHeader for the close button
            />
            <TaskForm
                initialTask={task}
                onSave={(taskData) => {
                    onSave(taskData);
                    onClose();
                }}
                onCancel={onClose}
                isEditing={true}
            />
        </Modal>
    );
};

const DeletionConfirmationModal = ({ isOpen, taskTitle, onClose, onDelete }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader
                title="Are you sure?"
                description={`This action cannot be undone. This will permanently delete task "${taskTitle}".`}
                onClose={onClose} // Pass onClose to ModalHeader for the close button
            />
            <ModalFooter>
                <button
                    onClick={onClose}
                    className={styles.buttonCancel}
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onDelete();
                        onClose();
                    }}
                    className={styles.buttonDelete}
                >
                    Delete
                </button>
            </ModalFooter>
        </Modal>
    );
};

export { TaskCreationModal, TaskEditModal, DeletionConfirmationModal };
