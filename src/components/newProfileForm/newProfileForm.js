import { useDispatch } from 'react-redux';
import { createProfile } from 'redux/slices/profileSlice';
import { useRef } from 'react';

//TODO: Maybe look into redux form

export default function NewProfileForm() {

    const dispatch = useDispatch()
    const profileUname = useRef()
    const profilePassword = useRef()
    const profileConfirm = useRef()
    const profileDname = useRef()
    const profileEmail = useRef()
    const profileNum = useRef()
    const profilePic = useRef()
    const profileBio = useRef()

    function dispatchInput(){
        const username = profileUname.current.value
        const pass = profilePassword.current.value
        const cPass = profileConfirm.current.value
        const dName = profileDname.current.value
        const email = profileEmail.current.value
        const phoneNum = profileNum.current.value
        const pic = profilePic.current.value
        const bio = profileBio.current.value


        dispatch(createProfile({Username: username, Password: pass, ConfirmPass: cPass, DisplayName: dName, Email: email, PhoneNumber:phoneNum, ProfilePic:pic, Bio:bio})) 
      } 
    //TODO: Put restrictions on input fields like password chars and confirm pass matching.
    return (
        <div>
            <h1>Create Profile</h1>
            <form id="new_profile" onSubmit={(event)=>{
                    event.preventDefault()
                    dispatchInput()
                }}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" ref={profileUname} minLength="10" maxLength="20" required/>
                <br/>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" ref={profilePassword} required/>
                <br/>
                <label htmlFor="confirm_password">Confirm Password</label>
                <input type="password" id="confirm_password" name="confirm_password" ref={profileConfirm} required/>
                <br/>
                <label htmlFor="display_name">Display Name</label>
                <input type="text" id="display_name" name="display_name" ref={profileDname} required/>
                <br/>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" ref={profileEmail} required/>
                <br/>
                <label htmlFor="phone_number">Phone Number</label>
                <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone_number" ref={profileNum}/>
                <br/>
                <label htmlFor="profile_pic">Profile Picture</label>
                <input type="file" id="profile_pic" name="profile_pic" ref={profilePic}/>
                <br/>
                <label htmlFor="bio">Bio</label>
                <textarea id="bio" name="bio" rows="4" cols="30" ref={profileBio}>
                </textarea>
                <br/>
                <input type="submit" value="Submit" id="submitButton"/>
            </form> 
        </div>
  )
}