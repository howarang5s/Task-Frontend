Task Management App - Frontend
A responsive and interactive web application for managing your tasks, built with React and Redux Toolkit. This frontend consumes a separate backend API to perform CRUD operations on tasks.

🚀 Features
Task Creation: Easily add new tasks with a title, description, deadline, and initial status.

Task Viewing: View all tasks in a clean, tabular format.

Task Editing: Modify existing task details (title, description, deadline, status) via a dedicated modal.

Task Deletion: Confirm and delete tasks.

Status Management: Tasks are categorized by status (To Do, In Progress, Done).

Filtering: Filter tasks by their status.

Search: Search tasks by title or description.

Overdue Highlighting: Visually indicates tasks that are past their deadline.

Input Validation: Prevents empty/overly long titles/descriptions and duplicate titles within the same status group.

Responsive Design: Optimized for various screen sizes (desktop, tablet, mobile).

Centralized State Management: Utilizes Redux Toolkit for predictable state management.

🛠️ Technologies Used
React: Frontend JavaScript library for building user interfaces.

Redux Toolkit: Official, opinionated, batteries-included toolset for efficient Redux development.

CSS Modules: For scoped and modular CSS styling.

Axios: Promise-based HTTP client for making API requests.

Lucide React: For lightweight and customizable icons.

HTML5 & CSS3: Standard web technologies.

⚙️ Installation & Setup
Follow these steps to get the frontend application running on your local machine.

Clone the repository:

git clone <YOUR_FRONTEND_REPO_URL>
cd <YOUR_FRONTEND_REPO_FOLDER_NAME>

(Replace <YOUR_FRONTEND_REPO_URL> and <YOUR_FRONTEND_REPO_FOLDER_NAME> with your actual repository URL and the folder name it creates.)

Install dependencies:

npm install
# or
yarn install

Configure API Endpoint:
Create a .env.local file in the root of your frontend project (where package.json is located) and add the backend API URL. This URL should point to your running backend server.

REACT_APP_API_BASE_URL=http://localhost:5000/task

Note: If your backend is deployed, replace http://localhost:5000/task with your deployed backend's base URL.

Start the development server:

npm start
# or
yarn start

The application will open in your browser, usually at http://localhost:3000.

🖥️ Usage
View Tasks: Tasks will be displayed in a table format.

Add New Task: Click the "Create Task" button in the header.

Edit Task: Click the "Edit" icon (pencil) next to a task.

Delete Task: Click the "Delete" icon (trash can) next to a task.

Filter Tasks: Use the "Status" dropdown to filter tasks.

Search Tasks: Type in the search bar to filter tasks by title or description.

🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or find any issues, please open an issue or submit a pull request.

📄 License
This project is licensed under the MIT License.
