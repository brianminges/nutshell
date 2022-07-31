import React, { useState, useEffect } from 'react';
import { addFriend, deleteFriend, getAllFriends, getAllUsers, getFriendById } from '../modules/FriendManager';
import UserCard from './UserCard';
import './../Nutshell.css'

export const UserList = ( ) => {
  // The initial state is an empty array
  const [userArray, setUserArray] = useState([]);
  const [friends, setFriends] = useState([]);
  const [friendIdArray, setFriendIdArray] = useState([]);
    const sessionUserId  = JSON.parse(window.sessionStorage.getItem("nutshell_user"))
   const currentUserId = sessionUserId.id

   const getUsers = () => {
    // After the data comes back from the API, we
    return getAllUsers().then(usersFromAPI => {
      setUserArray(usersFromAPI)
    });
  };
  const getFriends = () => {
    // After the data comes back from the API, we
    return getAllFriends(currentUserId).then(usersFromAPI => {
        setFriends(usersFromAPI)     });
            
  };
  // setFriendIdArray(friends.map((friendObj) => {return friendObj.userId}))

  const handleUnfriend = id => {
    console.log('delete userid id',id)
    deleteFriend( id)
    .then(() => getUsers()).then(getFriends)
  };
 
 const handleFriend = id => {
    const newFriend = {
      userId: id,
      currentUserId: currentUserId
    }
    addFriend(newFriend)
    .then(() => getUsers()).then(getFriends)
  };
  const getFriend = (userId) => {
 return friends.find(friend => friend.userId===userId)
  }

  useEffect(() => { 
        getFriends().then(getUsers);
  }, []);

  // Finally we use .map() to "loop over" the user array to show a list of user cards
  return (
      <>
      <h2 className="page__title">Friends</h2>
    <div className="container-cards">
        
      {userArray.map(user => {      
        const friendObj = getFriend(user.id)
      return <UserCard key={user.id} user={user} handleFriend={handleFriend}  friendObj={friendObj} handleUnfriend={handleUnfriend}/>})}
    </div>
    </>
  );

};
