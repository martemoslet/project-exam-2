import { API_HOLIDAZE_URL, } from "../../constants";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../../components/auth/authFetch";

const action = "/profiles";

export default function AvatarChange(profileData) {
const [avatar, setAvatar] = useState([]);
let { name } = useParams();
const refresh = () => window.location.reload(true)

async function onFormSubmit(event) {
event.preventDefault();
const profileData = {
avatar,
};

const updateProfileURL = `${API_HOLIDAZE_URL}${action}/${name}/media`;

const response = await authFetch(updateProfileURL, {
headers: {
"Content-Type": "application/json",
},
method: 'PUT',
body: JSON.stringify(profileData)
});
const result = await response.json()
if (response.status === 201 || 204) {
    refresh();
return result;
} else {
alert("Something went wrong");
}
}

function onAvatarChange(event) {
setAvatar(event.target.value);
}

return (
<div>
<form onSubmit={onFormSubmit}>
<label htmlFor="avatar">Update profile image</label>
<input name="avatar" value={avatar} onChange={onAvatarChange} />
<input type="submit" />
</form>
</div>
);
}
