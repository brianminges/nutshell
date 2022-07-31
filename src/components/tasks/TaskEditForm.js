import React, { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom";
import {getTaskById, editTask, getAllTasks} from "./../modules/TaskManager"
import "./TaskForm.css"
import "./../Nutshell.css"

export const TaskEditForm = () => {
  const [task, setTask] = useState({ ticket: "", detail: "" , dueDate: "", status: "", priority: ""});
  const [isLoading, setIsLoading] = useState(false);

  const {taskId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...task };
    stateToChange[evt.target.id] = evt.target.value;
    setTask(stateToChange);
  };

  const updateExistingTask = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedTask = {
      id: taskId,
      ticket: task.ticket,
      detail: task.detail,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority
    };

  editTask(editedTask)
    .then(() => navigate("/tasks")
    )
  }

  useEffect(() => {
    getAllTasks()
        .then(setTask)
}, []);

  useEffect(() => {
    getTaskById(taskId)
      .then(task => {
        setTask(task);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
		
    <h2 className="page__title">Edit Task</h2>
<div className="taskForm">
<form className="taskForm2">

  <fieldset>
    <div className="form__input">
      <label className="form__input__label">Task Title:</label>
      <input type="text" id="ticket" onChange={handleFieldChange} required autoFocus className="form__input__field" placeholder="task title" value={task.ticket} />
    </div>
  </fieldset>
        <fieldset>
    <div className="form__input">
      <label className="form__input__label">Task Details:</label>
      <input type="text" id="detail" onChange={handleFieldChange} required autoFocus className="form__input__field"  placeholder="task details" value={task.detail} />
    </div>
  </fieldset>
  <fieldset>
    <div className="form__input">
            <label className="form__input__label"> Due Date: </label>
    <input type="date" name="dueDate" id="dueDate" value={task.dueDate} onChange={handleFieldChange} className="form__input__field" >
      </input>
    </div>
    </fieldset>
        <fieldset>
      <div className="form__input">
      <label className="form__input__label">Status of Task: </label>
      <select value={task.status} name="status" id="status" onChange={handleFieldChange} className="form__input__field"  >
        <option value="0">status options</option>
          <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                        <option value="currently working on">currently working on</option>
      </select>
    </div>
  </fieldset>
        <fieldset>
      <div className="form__input">
      <label className="form__input__label">Priority Level: </label>
      <select value={task.priority} name="priority" id="priority" onChange={handleFieldChange} className="form__input__field"  >
        <option value="0">priority options</option>
          <option value="high priority">high priority</option>
          <option value="low priority">low priority</option>
          <option value="no priority, get done whenever">no priority, get done whenever</option>
      </select>
    </div>
  </fieldset>
  <div className="form__input crud__btn">
    <button className="submit__btn"
      onClick={updateExistingTask}>
      add task
          </button>
    </div>
</form>
</div>
    </>
  );
}