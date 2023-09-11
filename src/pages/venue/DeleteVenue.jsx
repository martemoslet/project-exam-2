import { API_HOLIDAZE_URL } from "../../constants";
import { authFetch } from "../../components/auth/authFetch";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const action = "/venues";
const method = "DELETE";



export default function RemoveVenue() {
    const navigate = useNavigate();
    let { id } = useParams();

    async function removeButton() {
        
        if (!id) {
            throw new Error("Deleting requires a venue id");
        }
        const removeVenueURL = `${API_HOLIDAZE_URL}${action}/${id}`;

        const response = await authFetch(removeVenueURL, {
            method,
        });
        if (response.status === 200 || 204) {
            navigate('/')
          } else {
            alert("Something went wrong");
          }

    }
    
    return (
        <button onClick={removeButton}>Delete</button>
    )

    
}