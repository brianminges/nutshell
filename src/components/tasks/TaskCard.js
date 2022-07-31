// TASKCARD

import React from 'react';
import './../Nutshell.css'
import "./TaskCard.css"
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ task, handleDeleteTask }) => {
  const navigate = useNavigate()

  return (
    <div className="tasks__card">
      <div className="task__card">
        <h4><span className="tasks__title">
          {task.ticket}
        </span></h4>
        <p><strong>Due on:</strong> {task.dueDate}</p>
        <p><strong>Details:</strong> {task.detail}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Priority Status:</strong> {task.priority}</p>


        <div className="crud__btns">
            <button className="crud__btn btn" type="button" onClick={() => handleDeleteTask(task.id)} id="delete__btn">Delete</button>

            <button className="crud__btn btn" id="edit__btn" onClick={() => {navigate(`/tasks/${task.id}/edit`)}}>Edit</button>
        </div>

        <hr></hr>


      </div>

    </div>
  
  );
}