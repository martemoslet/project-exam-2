import { API_HOLIDAZE_URL, } from "../../constants";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../../components/auth/authFetch";

const action = "/profiles";

export default function VenueManager(profileData) {
const [venueManager, setVenueManager] = useState([]);
let { name } = useParams();

async function onFormSubmit(event) {
event.preventDefault();
const profileData = {
venueManager: true,
};

const updateProfileURL = `${API_HOLIDAZE_URL}${action}/${name}`;

const response = await authFetch(updateProfileURL, {
headers: {
"Content-Type": "application/json",
},
method: 'PUT',
body: JSON.stringify(profileData)
});
const result = await response.json()
if (response.status === 201 || 204) {
//alert("Update successful");
console.log(result)
return result;
} else {
alert("Something went wrong");
}
}

function onVenueManagerChange(event) {
setVenueManager(event.target.value);
}

return (
<div>
<form onSubmit={onFormSubmit}>
<input name="venueManager" type="checkbox" id='venueManager' className='me-2' onChange={onVenueManagerChange} 
value={venueManager} hidden />
<label htmlFor="venueManager" id="venueManager"></label>

<button type="submit">I want to become a venue manager</button>
</form>
</div>
);
}
