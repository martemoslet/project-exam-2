import { API_HOLIDAZE_URL } from "../../constants";
import { authFetch } from "../../components/auth/authFetch";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../../components/ui/Button.module.css";
import Button from "react-bootstrap/Button";

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
      navigate("/");
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div className="mt-3 mb-4">
      <Button className={styles.removeBtn} onClick={removeButton}>
        Delete venue
      </Button>
    </div>
  );
}
