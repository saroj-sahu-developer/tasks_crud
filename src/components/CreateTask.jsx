import React from 'react'
import { useState } from 'react';
import { post } from '../services/tasks_api_calls';


const CreateTask = ({onTaskCreated}) => {
  const [desc, setDesc] = useState('');

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const createTask = async() => {
      try {
        const response = await post('/tasks', {description: desc});
        setDesc('');
        onTaskCreated(response.data);
      }
      catch(error) {
        console.log(error);
      }
    }

    createTask();
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Enter Task:
        <input name={desc} value={desc} onChange={handleDescChange}/>
      </label>

      <button type='submit'>Add</button>
    </form>
  );
}

export default CreateTask;
