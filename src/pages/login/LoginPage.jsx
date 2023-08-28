import { useState } from "react";


export default function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


async function onFormSubmit(event) {
event.preventDefault();
const body = {
email,
password,
};

fetch("https://api.noroff.dev/api/v1/holidaze/auth/login", {
    headers: {
        "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(body),
});
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
