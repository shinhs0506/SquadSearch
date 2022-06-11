
import {useDispatch} from 'react-redux';
import {createEvent} from 'redux/slices/eventSlice'
import { useRef } from 'react';


//TODO: Maybe look into redux form

export default function NewEventForm() {

    const eventName = useRef()
    const eventDate = useRef()
    const eventLocation = useRef()
    const dispatch = useDispatch()

    function dispatchInput(){
        const inputName = eventName.current.value
        const inputDate = eventDate.current.value
        const inputLocation = eventLocation.current.value
        dispatch(createEvent({Name: inputName, Date: inputDate, Location: inputLocation})) 
      } 
      
      function resetForm(){
        eventName.current.value = ''
        eventDate.current.value = ''
        eventLocation.current.value = ''
      }

  return (
    <div>
      <h1>New Event Form</h1>

      <form id="new_event" onSubmit={(event)=>{
            event.preventDefault()
            dispatchInput()
            resetForm()
          }
        }>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" ref={eventName}/>
        <br/>
        <label htmlFor="date ">Date</label>
        <input type="date" id="date" name="date" ref={eventDate}/>
        <br/>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" name="location" ref={eventLocation}/>
        <br/>
        <input type="submit" value="Submit" id="submitButton"/>
      </form> 
    </div>
  );
}
