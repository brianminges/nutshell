import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../modules/TaskManager';
import { getAllTasks } from '../modules/TaskManager';
import './../Nutshell.css'
import "./TaskForm.css"


export const TaskForm = () => {
	// State will contain both employee data as well as an isLoading flag.
	// Define the initial state of the form inputs with useState()

	const [task, setTask] = useState({
		id: "",
		ticket: "",
        detail: "",
        dueDate: "",
        status: "",
        priority: "",
	});

	const [isLoading, setIsLoading] = useState(false);

	// you will need the the `getAll` in the LocationsManager and CustomersManager to complete this section
	const [tasks, setTasks] = useState([]);
	// const [locations, setLocations] = useState([]);
	// const [customers, setCustomers] = useState([]);

	const navigate = useNavigate();

	//when a fiel changes, update state. The return will re-render and display based on the values in state
	// NOTE! What's happening in this function can be very difficult to grasp. Read it over many times and ask a lot questions about it.
	//Controlled component

	const handleControlledInputChange = (event) => {
		/* When changing a state object or array,
		always create a copy, make changes, and then set state.*/
		const newTask = { ...task}
		let selectedVal = event.target.value
		// forms always provide values as strings. But we want to save the ids as numbers.
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)
		}
		/* employee is an object with properties.
		Set the property to the new value
		using object bracket notation. */
		newTask[event.target.id] = selectedVal
		// update state
		setTask(newTask)
	}

        const getTasks = () => {
            return getAllTasks().then(tasksFromAPI => {
                setTasks(tasksFromAPI)
            })
        }

    useEffect(() => {
        getTasks()
		//load location data and setState
	}, []);



	const handleClickSaveTask = (event) => {
		event.preventDefault() //Prevents the browser from submitting the form

		const taskId = task.id

		if (taskId === 0) {
			window.alert("Please enter information")
		} else {
			//invoke addemployee passing employee as an argument.
			//once complete, change the url and display the employee list
			addTask(task)
				.then(() => navigate("/tasks"))
		}
	}

	return (
        <>
		
        <h2 className="page__title">New Task</h2>
		<div className="taskForm">
		<form className="taskForm2">

			<fieldset>
				<div className="form__input">
					<label className="form__input__label">Task Title:</label>
					<input type="text" id="ticket" onChange={handleControlledInputChange} required autoFocus className="form__input__field" placeholder="task title" value={task.ticket} />
				</div>
			</fieldset>
            <fieldset>
				<div className="form__input">
					<label className="form__input__label">Task Details:</label>
					<input type="text" id="detail" onChange={handleControlledInputChange} required autoFocus className="form__input__field"  placeholder="task details" value={task.detail} />
				</div>
			</fieldset>
			<fieldset>
				<div className="form__input">
                <label className="form__input__label"> Due Date: </label>
				<input type="date" name="dueDate" id="dueDate" value={task.dueDate} onChange={handleControlledInputChange} className="form__input__field" >
					</input>
				</div>
    		</fieldset>
            <fieldset>
			    <div className="form__input">
					<label className="form__input__label">Status of Task: </label>
					<select value={task.status} name="status" id="status" onChange={handleControlledInputChange} className="form__input__field"  >
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
					<select value={task.priority} name="priority" id="priority" onChange={handleControlledInputChange} className="form__input__field"  >
						<option value="0">priority options</option>
							<option value="high priority">high priority</option>
                            <option value="low priority">low priority</option>
                            <option value="no priority, get done whenever">no priority, get done whenever</option>
					</select>
				</div>
			</fieldset>
			<div className="form__input crud__btn">
				<button className="submit__btn"
					onClick={handleClickSaveTask}>
					add task
          		</button>
		  	</div>
		</form>
		</div>
        </>
	)
};