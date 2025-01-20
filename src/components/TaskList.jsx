import React, { useState } from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  const tasksPerPage = 5; // Number of tasks per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  // Get tasks for the current page
  const currentTasks = tasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  // Handle page navigation
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle action from dropdown
  const handleAction = (action, task) => {
    if (action === "edit") {
      onEdit(task);
    } else if (action === "delete") {
      onDelete(task.id);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Dicriptions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTasks.map((task, index) => (
            <tr key={index}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <select
                  onChange={(e) => handleAction(e.target.value, task)}
                  defaultValue=""
                >
                  <option value="" disabled>
                  </option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{
              margin: "0 5px",
              backgroundColor: currentPage === index + 1 ? "#ccc" : "#fff",
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;
