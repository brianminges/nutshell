import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {getAllFriends} from '../modules/FriendManager';
import {saveMessage} from '../modules/MessageManager';
import { getAllMessages } from '../modules/MessageManager';
import './MessageForm.css'

export const MessageForm = () => {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("nutshell_user"))
    const sessionUserId = sessionUser.id
    const navigate = useNavigate()
    const [message, setMessage] = useState({
        id: null,
        fromUserId: sessionUserId,
        toUserId: null,
        subject: "",
        message: ""
    });
    
    const [friends, setFriends] = useState([]);

    const handleControlledInputChange = (event) => {
        const newMessage = {...message}
        let selectedVal = event.target.value

        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }

        newMessage[event.target.id] = selectedVal

        setMessage(newMessage)
    }

    const getFriends = () => {
        return getAllFriends(sessionUser.id).then(friends => {
            setFriends(friends)
        })
    }

    useEffect(() => {
        getFriends()
    }, [])

    const handleClickSendMessage = (event) => {
        event.preventDefault()
        saveMessage(message)
        .then(() => 
        window.alert("Message sent"),
        navigate("/"))
    }

    return (
        <form className="messageForm">
        <h2 className="page__title">New Message</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="recipient">Choose a Recipient </label>
                <select value={message.toUserId} name="toUserId" id="toUserId" onChange={handleControlledInputChange} className="form-control" >
                    <option value="0">Select a Friend</option>
                    {friends.map(l => (
                        <option key={l.id} value={l.id}>
                            {l.user.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="subject">Message Subject:</label>
                <input type="text" id="subject" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Message Subject" value={message.subject} />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="body">Message:</label>
                <input type="text" id="message" onChange={handleControlledInputChange} autoFocus className="form-control" placeholder="Message Content" value={message.message} />
            </div>
        </fieldset>
        <div className="crud__btns">
            <button className="submit__btn"
                onClick={handleClickSendMessage}>
                Send Message
        </button>
        </div>
    </form>

    )

}

