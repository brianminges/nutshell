// TASKLIST

import React, { useState, useEffect } from 'react';
import { TaskCard } from './TaskCard';
import { getAllTasks, deleteTask } from '../modules/TaskManager';
import { useNavigate} from "react-router-dom"
import "./TaskList.css"
import "./../Nutshell.css"

export const TaskList = () => {
  // The initial state is an empty array
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const getTasks = () => {
    return getAllTasks().then(tasksFromAPI => {
      setTasks(tasksFromAPI)
    });
  };

  const handleDeleteTask = id => {
    deleteTask(id)
    .then(() => getAllTasks().then(setTasks));
};

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
    <h2 className="page__title">Tasks</h2>

    <section className="section-content">
        <div className="big__btns">
            <button type="button" className="big__btn btn" id="big__btn" onClick={() => {navigate("/tasks/create")}} >Add a Task</button>
        </div>
        </section>
      <div className="tasks__card">
          {tasks.map(task =>
          <TaskCard
              key={task.id}
              task={task}
              handleDeleteTask={handleDeleteTask} /> )}
      </div>
    </>
  );
};

