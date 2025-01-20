import React, { useState } from "react";

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    task?.id
      ? task
      : {
          assignedTo: "",
          status: "Not Started",
          dueDate: "",
          priority: "Normal",
          comments: "",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{task?.id ? "Edit Task" : "New Task"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Two Columns Layout */}
          <div className="form-row">
            {/* First Column */}
            <div className="form-column">
              <div>
                <label>Assigned To:</label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Status:</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            {/* Second Column */}
            <div className="form-column">
              <div>
                <label>Due Date:</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Priority:</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="High">High</option>
                  <option value="Normal">Normal</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Comments Field */}
          <div>
            <label>Comments:</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="modal-buttons">
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
