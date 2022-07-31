const remoteURL = "http://localhost:8088"

export const getUsersById = (userId) => {
    return fetch(`${remoteURL}/users/${userId}`)
    .then(res => res.json())
  }
  
  export const getAllUsers = () => {
    return fetch(`${remoteURL}/users`)
    .then(res => res.json())
  }

  export const getFriendById = (userId) => {
    return fetch(`${remoteURL}/users/${userId}`)
    .then(res => res.json())
  }

  export const getAllFriends = (userId) => {
    return fetch(`${remoteURL}/friends?currentUserId=${userId}&_expand=user`)
    .then(res => res.json())
  }

  export const getAllFriendsExpanded = (userId) => {
    return fetch (`${remoteURL}/friends`)
  }
//return fetch(`${remoteURL}/friends?id=${Id}`, {
  // -- return fetch(`${remoteURL}/friends/${Id}`, {
 //http://localhost:8088/friends/?CurrentUserId=4&_expand=user
 //friends?currentUserId=4&userId=3
  export const deleteFriend = (taco) => {
    return fetch(`${remoteURL}/friends/${taco}`, {
      method: "DELETE"
    }).then(result => result.json())
  }
  
  export const addFriend = (newFriend) => {
    return fetch(`${remoteURL}/friends`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newFriend)
    }).then(response => response.json())
  }