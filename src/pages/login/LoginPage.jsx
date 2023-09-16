import { useState } from "react";
import * as storage from "../../components/auth/storage"
import { useNavigate } from 'react-router-dom';



export default function Login(profile) {
const navigate = useNavigate();
const refresh = () => window.location.reload(true)
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


async function onFormSubmit(event) {
event.preventDefault();
const body = {
email,
password,
};

const response = await fetch("https://api.noroff.dev/api/v1/holidaze/auth/login", {
    headers: {
        "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(body),
});

const { accessToken, ...user } = await response.json();

storage.save("token", accessToken);
storage.save("profile", user);

if (response.status === 200) {
    navigate('/')
    refresh();
} else {
  alert("Wrong email or password");
  storage.remove("token");
  storage.remove("profile");
}
}

function onEmailChange(event) {
setEmail(event.target.value);
}
function onPasswordChange(event) {
setPassword(event.target.value);
}


return (
<div>
<form onSubmit={onFormSubmit}>
<h1>Login</h1>


<label htmlFor="email">Email address</label>
<input name="email" value={email} onChange={onEmailChange} />

<label htmlFor="passowrd">Password</label>
<input name="password" value={password} onChange={onPasswordChange} type="password" />


<input type="submit" />
</form>


</div>
);
}
