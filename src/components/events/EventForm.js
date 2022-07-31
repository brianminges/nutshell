import react, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { addEvent, getAllEvents, getEventById } from './../modules/EventManager'
// import './EventForm.css'
import './../Nutshell.css'


export const AddEventForm = () => {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("nutshell_user"))
    const sessionUserId = sessionUser.id
    const [event, setEvent] = useState({
        
        label: "",
        detail: "",
        onDate: new Date().toLocaleString(),
        time: "",
        location: "",
        userId: 3
    });

    const navigate = useNavigate();

    const handleInputChange = (evt) => {
        const newEvent = {...event}
        let selectedVal = evt.target.value
        newEvent[evt.target.id] = selectedVal
        setEvent(newEvent)
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (event.label === "" || event.detail === "") {
            window.alert('All fields must be filled in')
        } else {
            addEvent(event)
                .then(() => navigate("/events"))
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [])
   

    return (
        <form>
            <div  className="form__inputs">
                <h2 className="page__title">Add an Event</h2>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="label" className="form__input__label" >Event Name</label>
                        <input type="text" className="form__input__field" id="label" onChange={handleInputChange} required value={event.label} /> 
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="detail" className="form__input__label" >Event Detail:</label>
                        <input type="text" className="form__input__field" id="detail" onChange={handleInputChange} required value={event.detail} /> 
                        
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="location" className="form__input__label" >Event Location:</label>
                        <input type="text" className="form__input__field" id="location" onChange={handleInputChange} required value={event.location} /> 
                        
                    </div>
                </fieldset>
                <fieldset>
                    <div  className="form__input">
                        <label htmlFor="dateAndTime" className="form__input__label">Happening On:</label>
				            <input type="date" name="onDate" id="onDate" value={event.onDate} onChange={handleInputChange} className="form__input__field" >
					        </input>
                            <div>
                            <label htmlFor="dateAndTime" className="form__input__label">Time:</label>
                            <input type="text" className="form__input__field" id="time" onChange={handleInputChange} required value={event.time} /> 
                            </div>
                    </div>
                </fieldset>
                <div className="form__input crud__btn">
                    <button className="submit__btn"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
                
            </div>
        </form>
    )
}