import { useState } from "react";

export default function Register() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [avatar, setAvatar] = useState('');
const [password, setPassword] = useState('');


async function onFormSubmit(event) {
event.preventDefault();
const profile = {
name,
email,
avatar,
password,
};

const response = await fetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
    headers: {
        "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(profile),
});
const result = await response.json()
if (response.status === 201 || 204) {
    alert("Registration successful");
    console.log(result)
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
<input type="checkbox" id='venueManager' className='me-2' />
<label htmlFor="venueManager">I want to register as a venue manager</label>
</div>


<input type="submit" />
</form>


</div>
);

}
