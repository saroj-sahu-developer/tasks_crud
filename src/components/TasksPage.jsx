import React, { useState, useEffect } from 'react';
import ListTasks from './ListTasks';
import CreateTask from './CreateTask';
import { get, del, put } from '../services/tasks_api_calls';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await get(`/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addToTasks = (newRecord) => {
    setTasks([...tasks, newRecord]);
  };

  const deleteTask = async (id) => {
    try {
      await del(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } 
    catch (error) 
    {
      console.error("Error while deleting:", error);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const response = await put(`/tasks/${id}`, updatedData);

      const updatedTasks = tasks.map(task => {
        if(task.id === id) {
          return response.data;
        }
        else {
          return task;
        }
      });
      setTasks(updatedTasks);
    } 
    catch (error) {
      console.error("Error while updating:", error);
    }
  };

  return (
    <>
      <CreateTask onTaskCreated={addToTasks} />
      <ListTasks 
        tasks={tasks} 
        loading={loading} 
        handleDelete={deleteTask}
        handleUpdate={updateTask}
      />
    </>
  );
};

export default TasksPage;
