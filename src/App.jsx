import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { getTasks, createTask, updateTask, deleteTask } from "./services/taskService"; 
import "./App.css"; // Include the CSS file for styling

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for the search query

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task) => {
    try {
      if (task.id) {
        await updateTask(task.id, task);
      } else {
        await createTask(task); 
      }
      setEditingTask(null); 
      fetchTasks(); 
    } catch (error) {
      console.error("Failed to save task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleAddNewTask = () => {
    setEditingTask({});
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) =>
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.priority.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="root">
      <div className="app">
        <h1>Tasks</h1>
        <button onClick={handleAddNewTask}>Add New Task</button>

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "8px",
              margin: "10px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        {editingTask && (
          <TaskForm
            task={editingTask}
            onSave={handleSave}
            onCancel={() => setEditingTask(null)}
          />
        )}

        <TaskList tasks={filteredTasks} onEdit={setEditingTask} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default App;
