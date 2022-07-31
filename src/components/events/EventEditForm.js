import React, { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom";
import {getEventById, editEvent, getAllEvents} from "./../modules/EventManager"
// import "./TaskForm.css"
import "./../Nutshell.css"

export const EventEditForm = () => {
  const [event, setEvent] = useState({ label: "", detail: "" , onDate: "", time: "", location: ""});
  const [isLoading, setIsLoading] = useState(false);

  const {eventId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...event };
    stateToChange[evt.target.id] = evt.target.value;
    setEvent(stateToChange);
  };

  const updateExistingEvent = evt => {
    evt.preventDefault()
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedEvent = {
      id: eventId,
      label: event.label,
      detail: event.detail,
      onDate: event.onDate,
      time: event.time,
      location: event.location
    };

  editEvent(editedEvent)
    .then(() => navigate("/events")
    )
  }

  useEffect(() => {
    getAllEvents()
        .then(setEvent)
}, []);

  useEffect(() => {
    getEventById(eventId)
      .then(event => {
        setEvent(event);
        setIsLoading(false);
      });
  }, []);

  return (
    <form>
    <div  className="form__inputs">
        <h2 className="page__title">Add an Event</h2>
        <fieldset>
            <div  className="form__input">
                <label htmlFor="label" className="form__input__label" >Event Name</label>
                <input type="text" className="form__input__field" id="label" onChange={handleFieldChange} required value={event.label} /> 
            </div>
        </fieldset>
        <fieldset>
            <div  className="form__input">
                <label htmlFor="detail" className="form__input__label" >Event Detail:</label>
                <input type="text" className="form__input__field" id="detail" onChange={handleFieldChange} required value={event.detail} /> 
                
            </div>
        </fieldset>
        <fieldset>
            <div  className="form__input">
                <label htmlFor="location" className="form__input__label" >Event Location:</label>
                <input type="text" className="form__input__field" id="location" onChange={handleFieldChange} required value={event.location} /> 
                
            </div>
        </fieldset>
        <fieldset>
            <div  className="form__input">
                <label htmlFor="dateAndTime" className="form__input__label">Happening On:</label>
                    <input type="date" name="onDate" id="onDate" value={event.onDate} onChange={handleFieldChange} className="form__input__field" >
                    </input>
                    <div>
                    <label htmlFor="dateAndTime" className="form__input__label">Time:</label>
                    <input type="text" className="form__input__field" id="time" onChange={handleFieldChange} required value={event.time} /> 
                    </div>
            </div>
        </fieldset>
        <div className="form__input crud__btn">
            <button className="submit__btn"
                onClick={updateExistingEvent}>
                Submit
            </button>
        </div>
        
    </div>
</form>
  );
}