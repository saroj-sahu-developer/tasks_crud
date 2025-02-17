import React, { useState, useRef } from "react";

const ListTasks = ({ tasks, loading, handleDelete, handleUpdate }) => {
  const [editMode, setEditMode] = useState(null);
  const [updatedText, setUpdatedText] = useState("");
  const inputRef = useRef(null);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleEditClick = (task) => {
    setEditMode(task.id);
    setUpdatedText(task.description);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleSaveClick = (id) => {
    if (updatedText.trim()) {
      handleUpdate(id, { description: updatedText });
    }
    setEditMode(null);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {editMode === task.id ? (
            <>
              <input
                ref={inputRef}
                type="text"
                value={updatedText}
                onChange={(e) => setUpdatedText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveClick(task.id)}
              />
              <button onClick={() => handleSaveClick(task.id)}>Save</button>
              <button onClick={() => setEditMode(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{task.description}</span>
              <button onClick={() => handleEditClick(task)}>Update</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ListTasks;
