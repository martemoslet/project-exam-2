import { useState } from "react";
import { authFetch } from "../../components/auth/authFetch";
import { useNavigate } from 'react-router-dom';

export default function Register() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [avatar, setAvatar] = useState('');
const [password, setPassword] = useState('');
const [venueManager, setVenueManager] = useState(false);
const navigate = useNavigate();


async function onFormSubmit(event) {
event.preventDefault();
const profile = {
name,
email,
avatar,
password,
venueManager,
};

const response = await authFetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
    headers: {
        "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(profile)
});

const result = await response.json()
if (response.status === 201 || 204) {
    //alert("Registration successful");
    console.log(result)
    navigate('/loginPage')
    return result;
    
  } else {
    alert("Something went wrong");
  }
}


function onNameChange(event) {
setName(event.target.value);
}
function onEmailChange(event) {
setEmail(event.target.value);
}
function onAvatarChange(event) {
setAvatar(event.target.value);
}
function onPasswordChange(event) {
setPassword(event.target.value);
}
function onVenueManagerChange(event) {
    setVenueManager(event.target.value);
    }


return (
<div>
<form onSubmit={onFormSubmit}>
<h1>Register</h1>
<label htmlFor="name">Full name</label>
<input name="name" value={name} onChange={onNameChange} />


<label htmlFor="email">Email address</label>
<input name="email" value={email} onChange={onEmailChange} />


<label htmlFor="avatar">Avatar</label>
<input name="avatar" value={avatar} onChange={onAvatarChange} />
<label htmlFor="passowrd">Password</label>
<input name="password" value={password} onChange={onPasswordChange} type="password" />


<div>
<input name="venueManager" type="checkbox" id='venueManager' className='me-2' onChange={onVenueManagerChange} 
value={venueManager} />
<label htmlFor="venueManager" id="venueManager">I want to register as a venue manager</label>
</div>


<input type="submit" />
</form>


</div>
);

}
