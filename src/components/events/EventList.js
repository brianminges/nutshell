// TASKLIST

import React, { useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { getAllEvents, deleteEvent } from '../modules/EventManager';
import { useNavigate} from "react-router-dom"
import "./EventList.css"
import "./../Nutshell.css"

export const EventList = () => {
  // The initial state is an empty array
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const getEvents = () => {
    return getAllEvents().then(eventsFromAPI => {
      setEvents(eventsFromAPI)
    });
  };

  const handleDeleteEvent = id => {
    deleteEvent(id)
    .then(() => getAllEvents().then(setEvents));
};

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
    <h2 className="page__title">Events</h2>

    <section className="section-content">
        <div className="big__btns">
            <button type="button" className="big__btn btn" id="big__btn" onClick={() => {navigate("/events/create")}} >Add an Event</button>
        </div>
        </section>

    <div className="events__card">
        {events.map(event =>
         <EventCard
            key={event.id}
            event={event}
            handleDeleteEvent={handleDeleteEvent} /> )}
    </div>
    </>
  );
};