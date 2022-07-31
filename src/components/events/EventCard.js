// EVENT CARD

import React from 'react';
import './../Nutshell.css'
import "./EventCard.css"
import { useNavigate } from "react-router-dom";

export const EventCard = ({ event, handleDeleteEvent }) => {
  const navigate = useNavigate()

  const sessionUser = JSON.parse(window.sessionStorage.getItem("nutshell_user"))
  const sessionUserId = sessionUser.id





  return (
    <div className="events__card">
      <div className="event__card">
        <h4><span className="event__title">
          {event.label}
        </span></h4>
        <p><strong>Happening On:</strong> {event.onDate} at {event.time}</p>
        <p><strong>Details:</strong> {event.detail}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Hosted by:</strong> {event.user.name}</p>


        <div className="crud__btns">
            <button className="crud__btn btn" type="button" onClick={() => handleDeleteEvent(event.id)} id="delete__btn">Delete</button>

            <button className="crud__btn btn" id="edit__btn" onClick={() => {navigate(`/events/${event.id}/edit`)}}>Edit</button>
        </div>

        <hr></hr>


      </div>

    </div>
  
  );
}