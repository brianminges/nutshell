// holds all interaction with the api for tasks

const remoteURL = "http://localhost:8088"

export const getTaskById = (taskId) => {
  //be sure your animals have good data and related to a location and customer
  return fetch(`${remoteURL}/tasks/${taskId}?_expand=ticket&_expand=detail`)
  .then(res => res.json())
}

export const getAllTasks = () => {
  return fetch(`${remoteURL}/tasks`)
  .then(res => res.json())
}

export const deleteTask = (id) => {
    return fetch(`${remoteURL}/tasks/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  }

  export const addTask = (newTask) => {
    return fetch(`${remoteURL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTask)
    }).then(response => response.json())
}

export const editTask = (editedTask) => {
  return fetch(`${remoteURL}/tasks/${editedTask.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(editedTask)
  }).then(response => response.json())
}