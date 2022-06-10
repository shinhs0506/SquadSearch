import {useDispatch} from 'react-redux';
import {newEvent} from '../../redux/slices/newEventSlice'
import { useRef } from 'react';

//TODO: Maybe look into redux form

export default function NewEventForm() {
    const eventTitle = useRef()
    const eventDate = useRef()
    const eventLocation = useRef()
    const dispatch = useDispatch()

    function dispatchInput(){
        const inputName = eventTitle.current.value
        const inputDate = eventDate.current.value
        const inputLocation = eventLocation.current.value
        dispatch(newEvent({Name: inputName, Date: inputDate, Location: inputLocation})) 
      } 
      
      function resetForm(){
        eventTitle.current.value = ''
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
        <label for="name">Name</label>
        <input type="text" id="name" name="name" ref={eventTitle}/>
        <br/>
        <label for="date ">Date</label>
        <input type="date" id="date" name="date" ref={eventDate}/>
        <br/>
        <label for="location">Location</label>
        <input type="text" id="location" name="location" ref={eventLocation}/>
        <br/>
        <input type="submit" value="Submit" id="submitButton"/>
      </form> 
    </div>
  );
}